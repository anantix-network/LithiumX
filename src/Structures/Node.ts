import fs from 'node:fs';
import path from 'node:path';
import WebSocket from 'ws';
import nodeCheck from '../Utils/NodeCheck';
import type { LavalinkResponse, LithiumXManager, PlaylistRawData } from './Manager';
import type { LithiumXPlayer, Track, UnresolvedTrack } from './Player';
import { LithiumXRest } from './Rest';
import { type PlayerEvent, type PlayerEvents, type TrackEndEvent, type TrackExceptionEvent, type TrackStartEvent, type TrackStuckEvent, TrackUtils, type WebSocketClosedEvent } from './Utils';

// Storage strategy interface
interface StorageStrategy {
	save(key: string, data: unknown): Promise<void>;
	load(key: string): Promise<unknown>;
	delete(key: string): Promise<void>;
	getAll(): Promise<string[]>;
}

interface PlayerSaveData {
	guildId: string;
	voiceChannel: string | null;
	textChannel: string | null;
	volume: number;
	paused: boolean;
	playing: boolean;
	position: number;
	track: import('./Player').Track | null;
	queue: (import('./Player').Track | import('./Player').UnresolvedTrack)[];
	queueRepeat: boolean;
	trackRepeat: boolean;
	isAutoplay: boolean;
	timestamp: number;
	requester?: string;
}

// File storage implementation
class FileStorage implements StorageStrategy {
	constructor(private basePath: string) {
		if (!fs.existsSync(basePath)) {
			fs.mkdirSync(basePath, { recursive: true });
		}
	}

	async save(key: string, data: unknown): Promise<void> {
		const filePath = path.join(this.basePath, `${key}.json`);
		await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
	}

	async load(key: string): Promise<unknown> {
		const filePath = path.join(this.basePath, `${key}.json`);
		if (!fs.existsSync(filePath)) return null;
		const data = await fs.promises.readFile(filePath, 'utf8');
		return JSON.parse(data);
	}

	async delete(key: string): Promise<void> {
		const filePath = path.join(this.basePath, `${key}.json`);
		if (fs.existsSync(filePath)) {
			await fs.promises.unlink(filePath);
		}
	}

	async getAll(): Promise<string[]> {
		const files = await fs.promises.readdir(this.basePath);
		return files.filter((file) => file.endsWith('.json')).map((file) => file.replace('.json', ''));
	}
}

// Memory storage implementation (for testing or temporary storage)
class MemoryStorage implements StorageStrategy {
	private data = new Map<string, unknown>();

	async save(key: string, data: unknown): Promise<void> {
		this.data.set(key, data);
	}

	async load(key: string): Promise<unknown> {
		return this.data.get(key) || null;
	}

	async delete(key: string): Promise<void> {
		this.data.delete(key);
	}

	async getAll(): Promise<string[]> {
		return Array.from(this.data.keys());
	}
}

class LithiumXNode {
	/** The socket for the node. */
	public socket: WebSocket | null = null;
	/** The stats for the node. */
	public stats!: NodeStats;
	public manager!: LithiumXManager;
	/** The node's session ID. */
	public sessionId: string | null = null;
	/** The REST instance. */
	public readonly rest!: LithiumXRest;

	// Storage for autoresume functionality
	private autoResumeInterval: NodeJS.Timeout | undefined = undefined;
	private storage: StorageStrategy | undefined;

	private static _manager: LithiumXManager;
	private reconnectTimeout: NodeJS.Timeout | undefined;
	private heartbeatTimer: NodeJS.Timeout | undefined;
	private reconnectAttempts = 1;

	/** Returns if connected to the Node. */
	public get connected(): boolean {
		if (!this.socket) return false;
		return this.socket.readyState === WebSocket.OPEN;
	}

	/** Returns the address for this node. */
	public get address(): string {
		return `${this.options.host}:${this.options.port}`;
	}

	/** @hidden */
	public static init(manager: LithiumXManager): void {
		LithiumXNode._manager = manager;
	}

	/**
	 * Creates an instance of Node.
	 * @param options
	 */
	constructor(public options: NodeOptions) {
		if (!this.manager) this.manager = LithiumXNode._manager;
		if (!this.manager) throw new RangeError('Manager has not been initiated.');

		if (this.manager.nodes.has(options.identifier || options.host)) {
			return this.manager.nodes.get(options.identifier || options.host) as LithiumXNode;
		}

		nodeCheck(options);

		this.options = {
			port: 2333,
			password: 'youshallnotpass',
			secure: false,
			retryAmount: 30,
			retryDelay: 60000,
			priority: 0,
			autoResume: false,
			autoResumeInterval: 60000,
			autoResumeStoragePath: './playerStorage',
			...options,
		};

		if (this.options.secure) {
			this.options.port = 443;
		}

		this.options.identifier = options.identifier || options.host;
		this.stats = {
			players: 0,
			playingPlayers: 0,
			uptime: 0,
			memory: {
				free: 0,
				used: 0,
				allocated: 0,
				reservable: 0,
			},
			cpu: {
				cores: 0,
				systemLoad: 0,
				lavalinkLoad: 0,
			},
			frameStats: {
				sent: 0,
				nulled: 0,
				deficit: 0,
			},
		};

		// Setup storage
		if (this.options.autoResume) {
			if (this.options.storageStrategy === 'memory') {
				this.storage = new MemoryStorage();
			} else {
				// Default to file storage
				const storagePath = path.resolve(this.options.autoResumeStoragePath ?? './playerStorage');
				this.storage = new FileStorage(storagePath);
			}
		}

		this.manager.nodes.set(this.options.identifier, this);
		this.manager.emit('NodeCreate', this);
		this.rest = new LithiumXRest(this);
	}

	/** Connects to the Node. */
	public connect(): void {
		if (this.connected) return;

		const headers = Object.assign({
			Authorization: this.options.password,
			'Num-Shards': String(this.manager.options.shards),
			'User-Id': this.manager.options.clientId,
			'Client-Name': this.manager.options.clientName,
		});

		this.socket = new WebSocket(`ws${this.options.secure ? 's' : ''}://${this.address}/v4/websocket`, { headers });
		this.socket.on('open', this.open.bind(this));
		this.socket.on('close', this.close.bind(this));
		this.socket.on('message', this.message.bind(this));
		this.socket.on('error', this.error.bind(this));
	}

	/** Destroys the Node and all players connected with it. */
	public destroy(): void {
		if (!this.connected) return;

		// Save player states before destroying if autoresume is enabled
		if (this.options.autoResume) {
			this.saveAllPlayers();
		}

		// Clear autoresume interval if it exists
		if (this.autoResumeInterval) {
			clearInterval(this.autoResumeInterval);
			this.autoResumeInterval = undefined;
		}

		this.stopHeartbeat();

		const players = this.manager.players.filter((p) => p.node === this);
		if (players.size) players.forEach((p) => p.destroy());

		this.socket?.close(1000, 'destroy');
		this.socket?.removeAllListeners();
		this.socket = null;

		this.reconnectAttempts = 1;
		clearTimeout(this.reconnectTimeout);

		this.manager.emit('NodeDestroy', this);
		this.manager.destroyNode(this.options.identifier ?? this.options.host);
	}

	private reconnect(): void {
		this.reconnectTimeout = setTimeout(() => {
			this.reconnectTimeout = undefined;
			if (this.reconnectAttempts >= (this.options.retryAmount ?? 30)) {
				const error = new Error(`Unable to connect after ${this.options.retryAmount ?? 30} attempts.`);

				this.manager.emit('NodeError', this, error);
				return this.destroy();
			}
			this.socket?.removeAllListeners();
			this.socket = null;
			this.manager.emit('NodeReconnect', this);
			this.connect();
			this.reconnectAttempts++;
		}, this.options.retryDelay ?? 60000);
	}

	private startHeartbeat(): void {
		const interval = this.options.heartbeatInterval ?? 30_000;
		const timeout = this.options.heartbeatTimeout ?? 5_000;

		this.heartbeatTimer = setInterval(async () => {
			const start = Date.now();
			let timeoutId: NodeJS.Timeout;
			const timeoutPromise = new Promise<never>((_, reject) => {
				timeoutId = setTimeout(() => reject(new Error('heartbeat timeout')), timeout);
			});

			try {
				await Promise.race([this.rest.get('/version'), timeoutPromise]);
				clearTimeout(timeoutId!);
				this.manager.emit('NodeHealthCheck', this, { latency: Date.now() - start, healthy: true });
			} catch {
				clearTimeout(timeoutId!);
				this.manager.emit('NodeHealthCheck', this, { latency: -1, healthy: false });
				if (!this.reconnectTimeout) this.reconnect();
			}
		}, interval);
	}

	private stopHeartbeat(): void {
		if (this.heartbeatTimer) {
			clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = undefined;
		}
	}

	protected open(): void {
		if (this.reconnectTimeout) {
			clearTimeout(this.reconnectTimeout);
			this.reconnectTimeout = undefined;
		}
		this.manager.emit('NodeConnect', this);

		// Setup auto-resume if enabled
		if (this.options.autoResume) {
			// Load saved player states on reconnect
			this.loadAllPlayers();

			// Set up interval to periodically save player states
			if (this.options.autoResumeInterval && !this.autoResumeInterval) {
				this.autoResumeInterval = setInterval(() => {
					this.saveAllPlayers();
				}, this.options.autoResumeInterval);
			}
		}

		this.stopHeartbeat(); // clear any stale timer before starting
		this.startHeartbeat();
	}

	protected close(code: number, reason: string): void {
		// Save all player states when connection closes if autoresume is enabled
		if (this.options.autoResume) {
			this.saveAllPlayers();
		}

		// Clear the autoresume interval when disconnected
		if (this.autoResumeInterval) {
			clearInterval(this.autoResumeInterval);
			this.autoResumeInterval = undefined;
		}

		this.stopHeartbeat();
		this.manager.emit('NodeDisconnect', this, { code, reason });
		if (code !== 1000 || reason !== 'destroy') this.reconnect();
	}

	protected error(error: Error): void {
		if (!error) return;
		this.manager.emit('NodeError', this, error);
	}

	protected message(d: Buffer | string): void {
		if (Array.isArray(d)) d = Buffer.concat(d);
		else if (d instanceof ArrayBuffer) d = Buffer.from(d);
		const payload = JSON.parse(d.toString());
		if (!payload.op) return;
		this.manager.emit('NodeRaw', payload);
		let player: LithiumXPlayer | undefined;
		switch (payload.op) {
			case 'stats':
				delete payload.op;
				this.stats = { ...payload } as unknown as NodeStats;
				break;
			case 'playerUpdate':
				player = this.manager.players.get(payload.guildId);
				if (player) player.position = payload.state.position || 0;
				break;
			case 'event':
				this.handleEvent(payload);
				break;
			case 'ready':
				this.rest.setSessionId(payload.sessionId);
				this.sessionId = payload.sessionId;
				if (this.options.resumeStatus) {
					this.rest.patch(`/v4/sessions/${this.sessionId}`, {
						resuming: this.options.resumeStatus,
						timeout: this.options.resumeTimeout,
					});
				}
				break;
			default:
				this.manager.emit('NodeError', this, new Error(`Unexpected op "${payload.op}" with data: ${payload.message}`));
				return;
		}
	}

	protected async handleEvent(payload: PlayerEvent & PlayerEvents): Promise<void> {
		if (!payload.guildId) return;
		const player = this.manager.players.get(payload.guildId);
		if (!player) return;
		const track = player.queue.current;
		const type = payload.type;

		if (!track && type !== 'WebSocketClosedEvent') return;

		let error: Error;
		switch (type) {
			case 'TrackStartEvent':
				this.trackStart(player, track as Track, payload);
				break;
			case 'TrackEndEvent':
				this.trackEnd(player, track as Track, payload);
				break;
			case 'TrackStuckEvent':
				this.trackStuck(player, track as Track, payload);
				break;
			case 'TrackExceptionEvent':
				this.trackError(player, track as Track | UnresolvedTrack, payload);
				break;
			case 'WebSocketClosedEvent':
				this.socketClosed(player, payload);
				break;
			default:
				error = new Error(`Node#event unknown event '${type}'.`);
				this.manager.emit('NodeError', this, error);
				break;
		}
	}

	protected trackStart(player: LithiumXPlayer, track: Track, payload: TrackStartEvent): void {
		player.playing = true;
		player.paused = false;
		this.manager.emit('TrackStart', player, track, payload);
	}

	protected async trackEnd(player: LithiumXPlayer, track: Track, payload: TrackEndEvent): Promise<void> {
		const { reason } = payload;

		// If the track failed to load or was cleaned up
		if (['loadFailed', 'cleanup'].includes(reason)) {
			this.handleFailedTrack(player, track, payload);
		}
		// If the track was forcibly replaced
		else if (reason === 'replaced') {
			this.manager.emit('TrackEnd', player, track, payload);
			player.queue.previous = player.queue.current;
		}
		// If the track ended and it's set to repeat (track or queue)
		else if (track && (player.trackRepeat || player.queueRepeat)) {
			this.handleRepeatedTrack(player, track, payload);
		}
		// If there's another track in the queue
		else if (player.queue.length) {
			this.playNextTrack(player, track, payload);
		}
		// If there are no more tracks in the queue
		else await this.queueEnd(player, track, payload);
	}

	public extractSpotifyTrackID(url: string): string | null {
		const regex = /https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
		const match = url.match(regex);
		return match ? (match[1] ?? null) : null;
	}

	public extractSpotifyArtistID(url: string): string | null {
		const regex = /https:\/\/open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
		const match = url.match(regex);
		return match ? (match[1] ?? null) : null;
	}

	// Handle autoplay
	private async handleAutoplay(player: LithiumXPlayer, track: Track) {
		const previousTrack = player.queue.previous;
		if (!player.isAutoplay || !previousTrack) return;
		const hasSpotifyURL = ['spotify.com', 'open.spotify.com'].some((url) => previousTrack.uri?.includes(url) ?? false);
		if (hasSpotifyURL) {
			const node = this.manager.useableNodes;
			if (!node) return;
			const res = await node.rest.get<LavalinkInfo>(`/v4/info`);
			const info = res as LavalinkInfo;
			const isSpotifyPluginEnabled = info.plugins.some((plugin: { name: string }) => plugin.name === 'lavasrc-plugin');
			const isSpotifySourceManagerEnabled = info.sourceManagers.includes('spotify');

			if (isSpotifyPluginEnabled && isSpotifySourceManagerEnabled) {
				const trackID = this.extractSpotifyTrackID(previousTrack.uri ?? '');
				const artistID = this.extractSpotifyArtistID(previousTrack.pluginInfo?.artistUrl ?? '');

				let identifier = '';
				if (trackID && artistID) {
					identifier = `sprec:seed_artists=${artistID}&seed_tracks=${trackID}`;
				} else if (trackID) {
					identifier = `sprec:seed_tracks=${trackID}`;
				} else if (artistID) {
					identifier = `sprec:seed_artists=${artistID}`;
				}

				if (identifier) {
					const recommendedResult = (await node.rest.get(`/v4/loadtracks?identifier=${encodeURIComponent(identifier)}`)) as LavalinkResponse;

					if (recommendedResult.loadType === 'playlist') {
						const playlistData = recommendedResult.data as PlaylistRawData;
						const recommendedTrack = playlistData.tracks[0];

						if (recommendedTrack) {
							player.queue.add(TrackUtils.build(recommendedTrack, player.get('Internal_BotUser')));
							player.play();
							return;
						}
					}
				}
			}
		}

		const hasYouTubeURL = ['youtube.com', 'youtu.be'].some((url) => previousTrack.uri?.includes(url) ?? false);

		let videoID = previousTrack.uri?.substring((previousTrack.uri?.indexOf('=') ?? -1) + 1) ?? '';

		if (!hasYouTubeURL) {
			const res = await player.search(`${previousTrack.author} - ${previousTrack.title}`, player.get('Internal_BotUser'));

			const firstTrack = res.tracks[0];
			const secondTrack = res.tracks[1];
			const fallbackTrack = firstTrack ?? secondTrack;
			if (fallbackTrack) {
				videoID = fallbackTrack.uri.substring(fallbackTrack.uri.indexOf('=') + 1);
			}
		}

		let randomIndex: number;
		let searchURI: string;

		do {
			randomIndex = Math.floor(Math.random() * 23) + 2;
			searchURI = `https://www.youtube.com/watch?v=${videoID}&list=RD${videoID}&index=${randomIndex}`;
		} while (track.uri.includes(searchURI));

		const res = await player.search(searchURI, player.get('Internal_BotUser'));

		if (res.loadType === 'empty' || res.loadType === 'error') return;

		let tracks = res.tracks;

		if (res.loadType === 'playlist') {
			tracks = res.playlist?.tracks ?? [];
		}

		const foundTrack = tracks.sort(() => Math.random() - 0.5).find((shuffledTrack) => shuffledTrack.uri !== track.uri);

		if (foundTrack) {
			if (this.manager.options.replaceYouTubeCredentials) {
				foundTrack.author = foundTrack.author.replace('- Topic', '');
				foundTrack.title = foundTrack.title.replace('Topic -', '');

				if (foundTrack.title.includes('-')) {
					const parts = foundTrack.title.split('-').map((str: string) => str.trim());
					foundTrack.author = parts[0] ?? foundTrack.author;
					foundTrack.title = parts[1] ?? foundTrack.title;
				}
			}
			player.queue.add(foundTrack);
			player.play();
		}
	}

	// Handle the case when a track failed to load or was cleaned up
	private handleFailedTrack(player: LithiumXPlayer, track: Track, payload: TrackEndEvent): void {
		player.queue.previous = player.queue.current;
		player.queue.current = player.queue.shift() ?? null;

		if (!player.queue.current) {
			this.queueEnd(player, track, payload);
			return;
		}

		this.manager.emit('TrackEnd', player, track, payload);
		if (this.manager.options.autoPlay) player.play();
	}

	// Handle the case when a track ended and it's set to repeat (track or queue)
	private handleRepeatedTrack(player: LithiumXPlayer, track: Track, payload: TrackEndEvent): void {
		const { queue, trackRepeat, queueRepeat } = player;
		const { autoPlay } = this.manager.options;

		if (trackRepeat) {
			if (queue.current) queue.unshift(queue.current);
		} else if (queueRepeat) {
			if (queue.current) queue.add(queue.current);
		}

		queue.previous = queue.current;
		queue.current = queue.shift() ?? null;

		this.manager.emit('TrackEnd', player, track, payload);

		if (payload.reason === 'stopped' && !(queue.current = queue.shift() ?? null)) {
			this.queueEnd(player, track, payload);
			return;
		}

		if (autoPlay) player.play();
	}

	// Handle the case when there's another track in the queue
	private playNextTrack(player: LithiumXPlayer, track: Track, payload: TrackEndEvent): void {
		player.queue.previous = player.queue.current;
		player.queue.current = player.queue.shift() ?? null;

		this.manager.emit('TrackEnd', player, track, payload);
		if (this.manager.options.autoPlay) player.play();
		if (this.manager.options.prefetch) player.prefetchNext();
	}

	protected async queueEnd(player: LithiumXPlayer, track: Track, payload: TrackEndEvent): Promise<void> {
		player.queue.previous = player.queue.current;
		player.queue.current = null;

		if (!player.isAutoplay) {
			player.queue.previous = player.queue.current;
			player.queue.current = null;
			player.playing = false;
			this.manager.emit('QueueEnd', player, track, payload);
			return;
		}

		await this.handleAutoplay(player, track);
	}

	protected trackStuck(player: LithiumXPlayer, track: Track, payload: TrackStuckEvent): void {
		player.stop();
		this.manager.emit('TrackStuck', player, track, payload);
	}

	protected trackError(player: LithiumXPlayer, track: Track | UnresolvedTrack, payload: TrackExceptionEvent): void {
		player.stop();
		this.manager.emit('TrackError', player, track, payload);
	}

	protected socketClosed(player: LithiumXPlayer, payload: WebSocketClosedEvent): void {
		this.manager.emit('SocketClosed', player, payload);
	}

	/**
	 * Save the state of all players connected to this node
	 */
	private async saveAllPlayers(): Promise<void> {
		if (!this.storage) return;
		try {
			const players = this.manager.players.filter((player) => player.node === this);
			if (players.size) {
				for (const player of players.values()) {
					await this.savePlayer(player);
				}
			}
		} catch (error: unknown) {
			const msg = error instanceof Error ? error.message : String(error);
			this.manager.emit('NodeError', this, new Error(`Error saving player states: ${msg}`));
		}
	}

	/**
	 * Save a single player's state to storage
	 */
	private async savePlayer(player: LithiumXPlayer): Promise<void> {
		if (!this.storage) return;
		try {
			const playerData = {
				guildId: player.guild,
				voiceChannel: player.voiceChannel,
				textChannel: player.textChannel,
				volume: player.volume,
				paused: player.paused,
				playing: player.playing,
				position: player.position,
				track: player.queue.current,
				queue: player.queue.map((track) => track),
				queueRepeat: player.queueRepeat,
				trackRepeat: player.trackRepeat,
				isAutoplay: player.isAutoplay,
				timestamp: Date.now(),
			};

			await this.storage.save(`player-${player.guild}`, playerData);
		} catch (error: unknown) {
			const msg = error instanceof Error ? error.message : String(error);
			this.manager.emit('NodeError', this, new Error(`Failed to save player state: ${msg}`));
		}
	}

	/**
	 * Load all saved player states from storage
	 */
	private async loadAllPlayers(): Promise<void> {
		if (!this.storage) return;
		try {
			const keys = await this.storage.getAll();

			for (const key of keys) {
				if (!key.startsWith('player-')) continue;

				try {
					const rawData = await this.storage.load(key);
					if (!rawData) continue;

					const data = rawData as PlayerSaveData;

					// Check if the stored data is too old
					const maxAge = this.options.autoResumeMaxAge || 86400000; // 24 hours in ms
					if (Date.now() - data.timestamp > maxAge) {
						await this.storage.delete(key);
						continue;
					}

					// Create or get an existing player
					const guildId = data.guildId;
					let player = this.manager.players.get(guildId);

					if (!player) {
						const createOptions: import('./Player').PlayerOptions = {
							guild: guildId,
							textChannel: data.textChannel ?? '',
							selfDeafen: true,
						};
						if (data.voiceChannel) createOptions.voiceChannel = data.voiceChannel;
						player = this.manager.create(createOptions);
					}

					// Restore player state
					player.queue.clear();
					if (data.queue && Array.isArray(data.queue)) {
						data.queue.forEach((track: import('./Player').Track | import('./Player').UnresolvedTrack) => {
							player!.queue.add(TrackUtils.build(track as unknown as import('./Utils').TrackData, data.requester));
						});
					}

					player.setVolume(data.volume);
					player.queueRepeat = data.queueRepeat;
					player.trackRepeat = data.trackRepeat;
					player.isAutoplay = data.isAutoplay;

					// If there was a current track, attempt to play it from the position
					if (data.track) {
						const track = TrackUtils.build(data.track as unknown as import('./Utils').TrackData, data.requester);
						player.queue.current = track;

						player.play();
						if (data.position) {
							player.seek(data.position);
						}

						if (data.paused) {
							player.pause(true);
						}
					}

					// Delete the saved state after restoring
					await this.storage.delete(key);

					this.manager.emit('PlayerResume', player, data);
				} catch (error: unknown) {
					const msg = error instanceof Error ? error.message : String(error);
					this.manager.emit('NodeError', this, new Error(`Error restoring player from ${key}: ${msg}`));
				}
			}
		} catch (error: unknown) {
			const msg = error instanceof Error ? error.message : String(error);
			this.manager.emit('NodeError', this, new Error(`Failed to load player states: ${msg}`));
		}
	}
}

interface NodeOptions {
	/** The host for the node. */
	host: string;
	/** The port for the node. */
	port?: number;
	/** The password for the node. */
	password?: string;
	/** Whether the host uses SSL. */
	secure?: boolean;
	/** The identifier for the node. */
	identifier?: string;
	/** The retryAmount for the node. */
	retryAmount?: number;
	/** The retryDelay for the node. */
	retryDelay?: number;
	/** Whether to resume the previous session. */
	resumeStatus?: boolean;
	/** The time the manager will wait before trying to resume the previous session. */
	resumeTimeout?: number;
	/** The timeout used for api calls. */
	requestTimeout?: number;
	/** Priority of the node. */
	priority?: number;
	/** Whether to enable auto-resume functionality. */
	autoResume?: boolean;
	/** Storage strategy to use for autoresume ('file' or 'memory') */
	storageStrategy?: 'file' | 'memory';
	/** Directory to store player states for auto-resume functionality. */
	autoResumeStoragePath?: string;
	/** Interval in ms to save player states to storage. */
	autoResumeInterval?: number;
	/** Maximum age in ms for saved player states. */
	autoResumeMaxAge?: number;
	/** Interval in ms between heartbeat pings to check node health. Default 30000. */
	heartbeatInterval?: number;
	/** Ms to wait for heartbeat ping response before marking unhealthy. Default 5000. */
	heartbeatTimeout?: number;
}

interface NodeStats {
	/** The amount of players on the node. */
	players: number;
	/** The amount of playing players on the node. */
	playingPlayers: number;
	/** The uptime for the node. */
	uptime: number;
	/** The memory stats for the node. */
	memory: MemoryStats;
	/** The cpu stats for the node. */
	cpu: CPUStats;
	/** The frame stats for the node. */
	frameStats: FrameStats;
}

interface MemoryStats {
	/** The free memory of the allocated amount. */
	free: number;
	/** The used memory of the allocated amount. */
	used: number;
	/** The total allocated memory. */
	allocated: number;
	/** The reservable memory. */
	reservable: number;
}

interface CPUStats {
	/** The core amount the host machine has. */
	cores: number;
	/** The system load. */
	systemLoad: number;
	/** The lavalink load. */
	lavalinkLoad: number;
}

interface FrameStats {
	/** The amount of sent frames. */
	sent?: number;
	/** The amount of nulled frames. */
	nulled?: number;
	/** The amount of deficit frames. */
	deficit?: number;
}

interface LavalinkInfo {
	version: { semver: string; major: number; minor: number; patch: number; preRelease: string };
	buildTime: number;
	git: { branch: string; commit: string; commitTime: number };
	jvm: string;
	lavaplayer: string;
	sourceManagers: string[];
	filters: string[];
	plugins: { name: string; version: string }[];
}

export { type CPUStats, type FrameStats, type LavalinkInfo, LithiumXNode, type MemoryStats, MemoryStorage, type NodeOptions, type NodeStats, type StorageStrategy };
