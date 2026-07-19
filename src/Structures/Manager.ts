/* eslint-disable no-async-promise-executor */

import { Collection } from '@discordjs/collection';
import { TypedEmitter } from 'tiny-typed-emitter';
import type { VoiceState } from '..';
import managerCheck from '../Utils/ManagerCheck';
import { Analytics, type AnalyticsOptions } from './Analytics';
import { LyricsManager, type LyricsManagerOptions } from './Lyrics';
import { LithiumXNode, type NodeOptions } from './Node';
import { LithiumXPlayer, type PlayerOptions, type Track, type UnresolvedTrack } from './Player';
import { QueueManager } from './QueueManager';
import {
	type LoadType,
	Plugin,
	type TrackData,
	type TrackEndEvent,
	type TrackExceptionEvent,
	type TrackStartEvent,
	type TrackStuckEvent,
	TrackUtils,
	type VoicePacket,
	type VoiceServer,
	type WebSocketClosedEvent,
} from './Utils';

interface CachedResult {
	result: SearchResult;
	expiresAt: number;
}

/** The main hub for interacting with Lavalink nodes and players. */
class LithiumXManager extends TypedEmitter<ManagerEvents> {
	public static readonly DEFAULT_SOURCES: Record<SearchPlatform, string> = {
		'youtube music': 'ytmsearch',
		youtube: 'ytsearch',
		spotify: 'spsearch',
		jiosaavn: 'jssearch',
		soundcloud: 'scsearch',
		deezer: 'dzsearch',
		tidal: 'tdsearch',
		applemusic: 'amsearch',
		bandcamp: 'bcsearch',
	};

	/** The map of players. */
	public readonly players = new Collection<string, LithiumXPlayer>();
	/** The map of nodes. */
	public readonly nodes = new Collection<string, LithiumXNode>();
	/** The options that were set. */
	public readonly options: ManagerOptions;
	private initiated = false;
	public caches = new Collection<string, CachedResult>();
	/** The Lyrics Manager */
	public lyrics: LyricsManager | undefined;
	/** The Queue Manager */
	public queues: QueueManager;
	/** The Analytics System */
	public analytics: Analytics;

	/** Returns the nodes that has the least load. */
	public get leastLoadNode(): Collection<string, LithiumXNode> {
		return this.nodes
			.filter((node) => node.connected)
			.sort((a, b) => {
				const aload = a.stats.cpu ? (a.stats.cpu.lavalinkLoad / a.stats.cpu.cores) * 100 : 0;
				const bload = b.stats.cpu ? (b.stats.cpu.lavalinkLoad / b.stats.cpu.cores) * 100 : 0;
				return aload - bload;
			});
	}

	/** Returns the nodes that has the least amount of players. */
	private get leastPlayersNode(): Collection<string, LithiumXNode> {
		return this.nodes.filter((node) => node.connected).sort((a, b) => a.stats.players - b.stats.players);
	}

	/** Returns a node based on priority. */
	private get priorityNode(): LithiumXNode | undefined {
		const filteredNodes = this.nodes.filter((node) => node.connected && (node.options.priority ?? 0) > 0);
		const totalWeight = filteredNodes.reduce((total, node) => total + (node.options.priority ?? 0), 0);
		if (totalWeight === 0) {
			return this.options.useNode === 'leastLoad' ? this.leastLoadNode.first() : this.leastPlayersNode.first();
		}
		const weightedNodes = filteredNodes.map((node) => ({
			node,
			weight: (node.options.priority ?? 0) / totalWeight,
		}));
		const randomNumber = Math.random();

		let cumulativeWeight = 0;

		for (const { node, weight } of weightedNodes) {
			cumulativeWeight += weight;
			if (randomNumber <= cumulativeWeight) {
				return node;
			}
		}

		return this.options.useNode === 'leastLoad' ? this.leastLoadNode.first() : this.leastPlayersNode.first();
	}

	/** Returns the node to use. */
	public get useableNodes(): LithiumXNode | undefined {
		return this.options.usePriority ? this.priorityNode : this.options.useNode === 'leastLoad' ? this.leastLoadNode.first() : this.leastPlayersNode.first();
	}

	/**
	 * Initiates the Manager class.
	 * @param options
	 */
	constructor(options: ManagerOptions) {
		super();

		managerCheck(options);
		LithiumXPlayer.init(this);
		LithiumXNode.init(this);
		TrackUtils.init(this);
		if (options.PlayerClass) options.PlayerClass.init(this);
		if (options.NodeClass) options.NodeClass.init(this);

		if (options.trackPartial) {
			TrackUtils.setTrackPartial(options.trackPartial);
			delete options.trackPartial;
		}

		this.options = {
			plugins: [],
			nodes: [
				{
					identifier: 'default',
					host: 'localhost',
					resumeStatus: false,
					resumeTimeout: 1000,
				},
			],
			shards: 1,
			autoPlay: true,
			usePriority: false,
			clientName: 'LithiumX (https://github.com/anantix-network/LithiumX)',
			defaultSearchPlatform: 'youtube',
			useNode: 'leastPlayers',
			prefetch: false,
			reconnectOnDisconnect: false,
			autoFailover: true,
			...options,
		};

		this.options.caches.maxSize ??= 100;

		if (this.options.plugins) {
			for (const [index, plugin] of this.options.plugins.entries()) {
				if (!(plugin instanceof Plugin)) throw new RangeError(`Plugin at index ${index} does not extend Plugin.`);
				plugin.load(this);
			}
		}

		if (this.options.nodes) {
			const NodeClass = this.options.NodeClass ?? LithiumXNode;
			for (const nodeOptions of this.options.nodes) {
				const node = new NodeClass(nodeOptions);
				this.nodes.set(node.options.identifier ?? node.options.host, node);
			}
		}
		this.on('NodeDisconnect', (disconnectedNode) => {
			if (!this.options.autoFailover) return;

			const availableNodes = [...this.nodes.filter((n) => n.connected && n !== disconnectedNode).values()];
			if (availableNodes.length === 0) return;

			availableNodes.sort((a, b) => {
				const aLoad = a.stats?.cpu?.lavalinkLoad ?? 0;
				const bLoad = b.stats?.cpu?.lavalinkLoad ?? 0;
				return aLoad - bLoad;
			});

			const migratePlayer = async (player: LithiumXPlayer, attempt = 0): Promise<void> => {
				if (attempt >= availableNodes.length) return;
				const target = availableNodes[attempt]!;
				try {
					await player.moveNode(target.options.identifier ?? target.options.host);
					this.emit('PlayerMigrated', player, disconnectedNode, target);
				} catch {
					await migratePlayer(player, attempt + 1);
				}
			};

			for (const player of [...this.players.filter((p) => p.node === disconnectedNode).values()]) {
				migratePlayer(player);
			}
		});

		// Initialize lyrics manager if enabled
		if (options.lyrics?.enabled) {
			this.lyrics = new LyricsManager(this, options.lyrics);
		}

		// Initialize queue manager
		this.queues = new QueueManager(this, options.queueManager);

		// Initialize analytics system
		this.analytics = new Analytics(this, options.analytics);
	}

	/**
	 * Initiates the Manager.
	 * @param clientId
	 */
	public init(clientId?: string): this {
		if (this.initiated) return this;
		if (typeof clientId !== 'undefined') this.options.clientId = clientId;
		if (typeof this.options.clientId !== 'string') throw new Error('"clientId" set is not type of "string"');
		if (!this.options.clientId) throw new Error('"clientId" is not set. Pass it in Manager#init() or as a option in the constructor.');
		for (const node of this.nodes.values()) {
			try {
				node.connect();
			} catch (err: unknown) {
				this.emit('NodeError', node, err instanceof Error ? err : new Error(String(err)));
			}
		}

		this.initiated = true;
		return this;
	}

	/**
	 * Searches the enabled sources based off the URL or the `source` property.
	 * @param query
	 * @param requester The user who requested the search.
	 * @returns The search result.
	 */
	public async search(query: string | SearchQuery, requester?: string): Promise<SearchResult> {
		const node = this.useableNodes;

		if (!node) {
			throw new Error('No available nodes.');
		}
		const _query: SearchQuery = typeof query === 'string' ? { query } : query;
		const _source = LithiumXManager.DEFAULT_SOURCES[(_query.source ?? this.options.defaultSearchPlatform) as SearchPlatform] ?? _query.source;
		let search = _query.query;

		if (!/^https?:\/\//.test(search)) {
			search = `${_source}:${search}`;
		}

		// Per-entry TTL cache check (uses normalized key)
		if (this.options.caches.enabled && this.options.caches.time > 0) {
			const entry = this.caches.get(search);
			if (entry) {
				if (Date.now() < entry.expiresAt) return entry.result;
				this.caches.delete(search);
			}
		}

		try {
			const res = (await node.rest.get(`/v4/loadtracks?identifier=${encodeURIComponent(search)}`)) as LavalinkResponse;
			if (!res) throw new Error('Query not found.');

			let searchData: TrackData[] = [];
			let playlistData: PlaylistRawData | undefined;

			switch (res.loadType) {
				case 'search':
					searchData = res.data as TrackData[];
					break;
				case 'track':
					searchData = [res.data as unknown as TrackData];
					break;
				case 'playlist':
					playlistData = res.data as PlaylistRawData;
					break;
			}

			const tracks = searchData.map((track) => TrackUtils.build(track, requester));
			let playlist: PlaylistData | undefined;

			if (res.loadType === 'playlist' && playlistData) {
				playlist = {
					name: playlistData.info.name,
					tracks: playlistData.tracks.map((track) => TrackUtils.build(track, requester)),
					duration: playlistData.tracks.reduce((acc, cur) => acc + (cur.info.length || 0), 0),
				};
			}

			const result: SearchResult = {
				loadType: res.loadType,
				tracks,
				...(playlist !== undefined ? { playlist } : {}),
			};

			if (this.options.replaceYouTubeCredentials) {
				let tracksToReplace: Track[] = [];
				if (result.loadType === 'playlist') {
					tracksToReplace = result.playlist?.tracks ?? [];
				} else {
					tracksToReplace = result.tracks;
				}

				for (const track of tracksToReplace) {
					if (isYouTubeURL(track.uri)) {
						track.author = track.author.replace('- Topic', '');
						track.title = track.title.replace('Topic -', '');
					}
					if (track.title.includes('-')) {
						const parts = track.title.split('-').map((str: string) => str.trim());
						track.author = parts[0] ?? track.author;
						track.title = parts[1] ?? track.title;
					}
				}
			}
			if (this.options.caches.enabled && this.options.caches.time > 0) {
				if (this.caches.size >= (this.options.caches.maxSize ?? 100)) {
					const oldestKey = this.caches.firstKey();
					if (oldestKey) this.caches.delete(oldestKey);
				}
				this.caches.set(search, { result, expiresAt: Date.now() + this.options.caches.time });
			}
			return result;
		} catch (err: unknown) {
			throw new Error(err instanceof Error ? err.message : String(err));
		}

		function isYouTubeURL(uri: string): boolean {
			return uri.includes('youtube.com') || uri.includes('youtu.be');
		}
	}

	/** Clears the entire search result cache, forcing re-fetches on subsequent searches. */
	public clearSearchCache(): void {
		this.caches.clear();
	}

	/**
	 * Decodes the base64 encoded tracks and returns a TrackData array.
	 * @param tracks
	 */
	public decodeTracks(tracks: string[]): Promise<TrackData[]> {
		const node = this.nodes.first();
		if (!node) return Promise.reject(new Error('No available nodes.'));

		return node.rest.post<TrackData[]>('/v4/decodetracks', JSON.stringify(tracks)).then((res) => {
			if (!res) throw new Error('No data returned from query.');
			return res;
		});
	}

	/**
	 * Decodes the base64 encoded track and returns a TrackData.
	 * @param track
	 */
	public async decodeTrack(track: string): Promise<TrackData> {
		const res = await this.decodeTracks([track]);
		const data = res[0];
		if (!data) throw new Error('No track data returned.');
		return data;
	}

	/**
	 * Creates a player or returns one if it already exists.
	 * @param options
	 */
	public create(options: PlayerOptions): LithiumXPlayer {
		if (this.players.has(options.guild)) {
			return this.players.get(options.guild)!;
		}

		return new (this.options.PlayerClass ?? LithiumXPlayer)(options);
	}

	/**
	 * Returns a player or undefined if it does not exist.
	 * @param guild
	 */
	public get(guild: string): LithiumXPlayer | undefined {
		return this.players.get(guild);
	}

	/**
	 * Destroys a player if it exists.
	 * @param guild
	 */
	public destroy(guild: string): void {
		this.players.delete(guild);
	}

	/**
	 * Creates a node or returns one if it already exists.
	 * @param options
	 */
	public createNode(options: NodeOptions): LithiumXNode {
		if (this.nodes.has(options.identifier || options.host)) {
			return this.nodes.get(options.identifier || options.host)!;
		}

		return new (this.options.NodeClass ?? LithiumXNode)(options);
	}

	/**
	 * Destroys a node if it exists.
	 * @param identifier
	 */
	public destroyNode(identifier: string): void {
		const node = this.nodes.get(identifier);
		if (!node) return;
		node.destroy();
		this.nodes.delete(identifier);
	}

	/**
	 * Sends voice data to the Lavalink server.
	 * @param data
	 */
	public async updateVoiceState(data: VoicePacket | VoiceServer | VoiceState): Promise<void> {
		if ('t' in data && !['VOICE_STATE_UPDATE', 'VOICE_SERVER_UPDATE'].includes(data.t)) return;

		const update = ('d' in data ? data.d : data) as unknown as Record<string, unknown>;

		if (!update || (!('token' in update) && !('session_id' in update))) return;

		const player = this.players.get(update['guild_id'] as string);

		if (!player) return;
		if ('token' in update) {
			player.voiceState.event = update as unknown as VoiceServer;

			const {
				sessionId,
				event: { token, endpoint },
			} = player.voiceState;

			await player.node.rest.updatePlayer({
				guildId: player.guild,
				data: { voice: { token, endpoint, sessionId: sessionId ?? '', channelId: player.voiceChannel ?? '' } },
			});

			return;
		}

		if (update['user_id'] !== this.options.clientId) return;
		if (update['channel_id']) {
			if (player.voiceChannel !== update['channel_id']) {
				this.emit('PlayerMove', player, player.voiceChannel ?? '', update['channel_id'] as string);
			}

			player.voiceState.sessionId = (update['session_id'] as string) ?? '';
			player.voiceChannel = update['channel_id'] as string;
			return;
		}

		this.emit('PlayerDisconnect', player, player.voiceChannel ?? '');
		player.voiceChannel = null;
		player.voiceState = Object.assign({});

		if (this.options.reconnectOnDisconnect) {
			return;
		}

		player.destroy();
		return;
	}
}

interface Payload {
	/** The OP code */
	op: number;
	d: {
		guild_id: string;
		channel_id: string | null;
		self_mute: boolean;
		self_deaf: boolean;
	};
}

interface ManagerOptions {
	/** Custom Player class extending LithiumXPlayer. Pass instead of using Structure.extend(). */
	PlayerClass?: typeof LithiumXPlayer;
	/** Custom Node class extending LithiumXNode. Pass instead of using Structure.extend(). */
	NodeClass?: typeof LithiumXNode;
	/** Use priority mode over least amount of player or load? */
	usePriority?: boolean;
	/** Use the least amount of players or least load? */
	useNode?: 'leastLoad' | 'leastPlayers';
	/** The array of nodes to connect to. */
	nodes?: NodeOptions[];
	/** The client ID to use. */
	clientId?: string;
	/** Value to use for the `Client-Name` header. */
	clientName?: string;
	/** The shard count. */
	shards?: number;
	/** A array of plugins to use. */
	plugins?: Plugin[];
	/** Whether players should automatically play the next song. */
	autoPlay?: boolean;
	/** An array of track properties to keep. `track` will always be present. */
	trackPartial?: string[];
	/** The default search platform to use, can be "youtube", "youtube music", "soundcloud" or deezer. */
	defaultSearchPlatform?: SearchPlatform;
	/** Whether the YouTube video titles should be replaced if the Author does not exactly match. */
	replaceYouTubeCredentials?: boolean;
	caches: {
		/** Whether to cache the search results. */
		enabled: boolean;
		/** The time to cache the search results (in ms). */
		time: number;
		/** Max number of entries in the search cache. Default: 100 */
		maxSize?: number;
	};
	/** Lyrics configuration */
	lyrics?: {
		/** Whether to enable the lyrics system */
		enabled?: boolean;
	} & LyricsManagerOptions;
	/** Queue manager configuration */
	queueManager?: import('./QueueManager').QueueManagerOptions;
	/** Analytics configuration */
	analytics?: AnalyticsOptions;
	/** Whether to keep players alive when the bot disconnects from voice (supports auto-reconnect). */
	reconnectOnDisconnect?: boolean;
	/** Whether to automatically migrate players to a working node when a node disconnects. Default: true */
	autoFailover?: boolean;
	/** Whether to prefetch the next UnresolvedTrack in the queue when a track ends. */
	prefetch?: boolean;
	/**
	 * Function to send data to the websocket.
	 * @param id
	 * @param payload
	 */
	send(id: string, payload: Payload): void;
}

type SearchPlatform = 'deezer' | 'soundcloud' | 'youtube music' | 'youtube' | 'spotify' | 'jiosaavn' | 'tidal' | 'applemusic' | 'bandcamp';

interface SearchQuery {
	/** The source to search from. */
	source?: SearchPlatform | string;
	/** The query to search for. */
	query: string;
}

interface LavalinkResponse {
	loadType: LoadType;
	data: TrackData[] | PlaylistRawData;
}

interface SearchResult {
	/** The load type of the result. */
	loadType: LoadType;
	/** The array of tracks from the result. */
	tracks: Track[];
	/** The playlist info if the load type is 'playlist'. */
	playlist?: PlaylistData;
}

interface PlaylistRawData {
	info: {
		/** The playlist name. */
		name: string;
	};
	/** Addition info provided by plugins. */
	pluginInfo: object;
	/** The tracks of the playlist */
	tracks: TrackData[];
}

interface PlaylistData {
	/** The playlist name. */
	name: string;
	/** The length of the playlist. */
	duration: number;
	/** The songs of the playlist. */
	tracks: Track[];
}

interface ManagerEvents {
	NodeCreate: (node: LithiumXNode) => void;
	NodeDestroy: (node: LithiumXNode) => void;
	NodeConnect: (node: LithiumXNode) => void;
	NodeReconnect: (node: LithiumXNode) => void;
	NodeDisconnect: (node: LithiumXNode, reason: { code?: number; reason?: string }) => void;
	NodeError: (node: LithiumXNode, error: Error) => void;
	NodeRaw: (payload: unknown) => void;
	NodeHealthCheck: (node: LithiumXNode, health: { latency: number; healthy: boolean }) => void;
	PlayerMigrated: (player: LithiumXPlayer, fromNode: LithiumXNode, toNode: LithiumXNode) => void;
	PlayerCreate: (player: LithiumXPlayer) => void;
	PlayerDestroy: (player: LithiumXPlayer) => void;
	PlayerStateUpdate: (oldPlayer: LithiumXPlayer, newPlayer: LithiumXPlayer) => void;
	PlayerMove: (player: LithiumXPlayer, initChannel: string, newChannel: string) => void;
	PlayerDisconnect: (player: LithiumXPlayer, oldChannel: string) => void;
	PlayerResume: (player: LithiumXPlayer, payload: object) => void;
	QueueEnd: (player: LithiumXPlayer, track: Track | UnresolvedTrack, payload: TrackEndEvent) => void;
	SocketClosed: (player: LithiumXPlayer, payload: WebSocketClosedEvent) => void;
	TrackStart: (player: LithiumXPlayer, track: Track, payload: TrackStartEvent) => void;
	TrackEnd: (player: LithiumXPlayer, track: Track, payload: TrackEndEvent) => void;
	TrackStuck: (player: LithiumXPlayer, track: Track, payload: TrackStuckEvent) => void;
	TrackError: (player: LithiumXPlayer, track: Track | UnresolvedTrack, payload: TrackExceptionEvent) => void;
	/** Emitted when lyrics are found for a track */
	LyricsFound: (player: LithiumXPlayer, lyrics: import('./Lyrics').LyricsData) => void;
	/** Emitted when lyrics could not be found for a track */
	LyricsNotFound: (player: LithiumXPlayer, track: Track | UnresolvedTrack) => void;
	/** Emitted when a queue is saved */
	QueueSaved: (player: LithiumXPlayer, queue: import('./QueueManager').SavedQueue) => void;
	/** Emitted when a queue is loaded */
	QueueLoaded: (player: LithiumXPlayer, queue: import('./QueueManager').SavedQueue) => void;
}

export {
	type LavalinkResponse,
	LithiumXManager,
	type ManagerEvents,
	type ManagerOptions,
	type Payload,
	type PlaylistData,
	type PlaylistRawData,
	type SearchPlatform,
	type SearchQuery,
	type SearchResult,
};
