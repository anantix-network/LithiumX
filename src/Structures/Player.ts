import { Filters } from "./Filters";
import { LavalinkResponse, LithiumXManager, PlaylistRawData, SearchQuery, SearchResult } from "./Manager";
import { LavalinkInfo, LithiumXNode } from "./Node";
import { LithiumXQueue } from "./Queue";
import { Sizes, State, Structure, TrackExceptionEvent, TrackSourceName, TrackUtils, VoiceState } from "./Utils";
import playerCheck from "../Utils/PlayerCheck";
import { FilterOptions, FilterPresets } from "./Filters";
import { LyricsData, LyricsOptions } from "./Lyrics";
import { SaveQueueOptions, LoadQueueOptions, QueueOperationResult } from "./QueueManager";

export class LithiumXPlayer {
	/** The Queue for the Player. */
	public readonly queue = new (Structure.get("Queue"))() as LithiumXQueue;
	/** The filters applied to the audio. */
	public filters!: Filters;
	/** Whether the queue repeats the track. */
	public trackRepeat = false;
	/** Whether the queue repeats the queue. */
	public queueRepeat = false;
	/**Whether the queue repeats and shuffles after each song. */
	public dynamicRepeat = false;
	/** The time the player is in the track. */
	public position = 0;
	/** Whether the player is playing. */
	public playing = false;
	/** Whether the player is paused. */
	public paused = false;
	/** The volume for the player */
	public volume!: number;
	/** The Node for the Player. */
	public node!: LithiumXNode;
	/** The guild for the player. */
	public guild!: string;
	/** The voice channel for the player. */
	public voiceChannel: string | null = null;
	/** The text channel for the player. */
	public textChannel: string | null = null;
	/** The current state of the player. */
	public state: State = "DISCONNECTED";
	/** The equalizer bands array. */
	public bands = new Array<number>(15).fill(0.0);
	/** The voice state object from Discord. */
	public voiceState!: VoiceState;
	/** The Manager. */
	public manager!: LithiumXManager;
	/** The autoplay state of the player. */
	public isAutoplay: boolean = false;

	private static _manager: LithiumXManager;
	private readonly data: Record<string, unknown> = {};
	private dynamicLoopInterval: NodeJS.Timeout | undefined = undefined;

	/**
	 * Currently applied filters
	 */

	/**
	 * Set custom data.
	 * @param key
	 * @param value
	 */
	public set(key: string, value: unknown): void {
		this.data[key] = value;
	}

	/**
	 * Get custom data.
	 * @param key
	 */
	public get<T>(key: string): T {
		return this.data[key] as T;
	}

	/** @hidden */
	public static init(manager: LithiumXManager): void {
		this._manager = manager;
	}

	/**
	 * Creates a new player, returns one if it already exists.
	 * @param options
	 */
	constructor(public options: PlayerOptions) {
		if (!this.manager) this.manager = Structure.get("Player")._manager;
		if (!this.manager) throw new RangeError("Manager has not been initiated.");

		if (this.manager.players.has(options.guild)) {
			return this.manager.players.get(options.guild) as LithiumXPlayer;
		}
		playerCheck(options);
		this.guild = options.guild;
		this.voiceState = Object.assign({
			op: "voiceUpdate",
			guild_id: options.guild,
		});
		if (options.voiceChannel) this.voiceChannel = options.voiceChannel;
		if (options.textChannel) this.textChannel = options.textChannel;
		const nodeById = options.node ? this.manager.nodes.get(options.node) : undefined;
		this.node = nodeById ?? this.manager.useableNodes!;

		if (!this.node) throw new RangeError("No available nodes.");

		this.manager.players.set(options.guild, this);
		this.manager.emit("PlayerCreate", this);
		this.setVolume(options.volume ?? 100);
		this.filters = new Filters(this);
	}

	/**
	 * Same as Manager#search() but a shortcut on the player itself.
	 * @param query The query to search.
	 * @param requester The user who requested the search.
	 */
	public search(query: string | SearchQuery, requester?: string): Promise<SearchResult> {
		return this.manager.search(query, requester);
	}

	/** Connect to the voice channel. */
	public connect(): this {
		if (!this.voiceChannel) throw new RangeError("No voice channel has been set.");
		this.state = "CONNECTING";
		this.manager.options.send(this.guild, {
			op: 4,
			d: {
				guild_id: this.guild,
				channel_id: this.voiceChannel,
				self_mute: this.options.selfMute || false,
				self_deaf: this.options.selfDeafen || false,
			},
		});

		this.state = "CONNECTED";
		return this;
	}

	/**
	 * Moves the player to a different node.
	 *
	 * @param {string} [node] - The ID of the node to move to.
	 * @returns {this} - The player instance.
	 */
	public async moveNode(node?: string): Promise<this> {
		node = node
			|| this.manager.leastLoadNode.first()?.options.identifier
			|| this.manager.nodes.filter((n) => n.connected).first()?.options.identifier;

		if (!node || !this.manager.nodes.has(node)) throw new RangeError("No nodes available.");
		if (this.node.options.identifier === node) return this;

		const currentNode = this.node;
		const destinationNode = this.manager.nodes.get(node);
		if (!destinationNode) throw new RangeError(`Node "${node}" not found.`);

		let position = this.position;
		if (currentNode.connected) {
			const fetchedPlayer = await currentNode.rest.get<{ track: { info: { position: number } } }>(
				`/v4/sessions/${currentNode.sessionId}/players/${this.guild}`
			);
			if (fetchedPlayer) position = fetchedPlayer.track.info.position;
		}

		const encodedTrack = this.queue.current?.track;
		await destinationNode.rest.updatePlayer({
			guildId: this.guild,
			data: {
				...(encodedTrack !== undefined ? { encodedTrack } : {}),
				position,
				volume: this.volume,
				paused: this.paused,
				filters: {
					distortion: this.filters.distortion,
					equalizer: this.filters.equalizer,
					karaoke: this.filters.karaoke,
					rotation: this.filters.rotation,
					timescale: this.filters.timescale,
					vibrato: this.filters.vibrato,
					volume: this.filters.volume,
				},
			},
		});

		if (this.voiceState?.sessionId) {
			await destinationNode.rest.updatePlayer({
				guildId: this.guild,
				data: {
					voice: {
						token: this.voiceState.event.token,
						endpoint: this.voiceState.event.endpoint,
						sessionId: this.voiceState.sessionId,
					},
				},
			});
		}

		this.node = destinationNode;
		this.state = "MOVING";
		if (currentNode.connected) {
			await currentNode.rest.destroyPlayer(this.guild);
		}
		setTimeout(() => (this.state = "CONNECTED"), 5000);
		return this;
	}

	/** Disconnect from the voice channel. */
	public disconnect(): this {
		if (this.voiceChannel === null) return this;
		this.state = "DISCONNECTING";

		this.pause(true);
		this.manager.options.send(this.guild, {
			op: 4,
			d: {
				guild_id: this.guild,
				channel_id: null,
				self_mute: false,
				self_deaf: false,
			},
		});

		this.voiceChannel = null;
		this.state = "DISCONNECTED";
		return this;
	}

	/** Destroys the player. */
	public destroy(disconnect = true): void {
		this.state = "DESTROYING";
		if (disconnect) this.disconnect();
		this.node.rest.destroyPlayer(this.guild);
		this.manager.emit("PlayerDestroy", this);
		this.manager.players.delete(this.guild);
	}

	/**
	 * Sets the player voice channel.
	 * @param channel
	 */
	public setVoiceChannel(channel: string): this {
		if (typeof channel !== "string") throw new TypeError("Channel must be a non-empty string.");
		this.voiceChannel = channel;
		this.connect();
		return this;
	}

	/**
	 * Sets the player text channel.
	 * @param channel
	 */
	public setTextChannel(channel: string): this {
		if (typeof channel !== "string") throw new TypeError("Channel must be a non-empty string.");
		this.textChannel = channel;
		return this;
	}

	/** Plays the next track. */
	public async play(): Promise<void>;

	/**
	 * Plays the specified track.
	 * @param track
	 */
	public async play(track: Track | UnresolvedTrack): Promise<void>;

	/**
	 * Plays the next track with some options.
	 * @param options
	 */
	public async play(options: PlayOptions): Promise<void>;

	/**
	 * Plays the specified track with some options.
	 * @param track
	 * @param options
	 */
	public async play(track: Track | UnresolvedTrack, options: PlayOptions): Promise<void>;
	public async play(optionsOrTrack?: PlayOptions | Track | UnresolvedTrack, playOptions?: PlayOptions): Promise<void> {
		if (typeof optionsOrTrack !== "undefined" && TrackUtils.validate(optionsOrTrack)) {
			if (this.queue.current) this.queue.previous = this.queue.current;
			this.queue.current = optionsOrTrack as Track;
		}
		if (!this.queue.current) throw new RangeError("No current track.");
		const finalOptions = playOptions
			? playOptions
			: ["startTime", "endTime", "noReplace"].every((v) => Object.keys(optionsOrTrack || {}).includes(v))
				? (optionsOrTrack as PlayOptions)
				: {};
		if (TrackUtils.isUnresolvedTrack(this.queue.current)) {
			try {
				this.queue.current = await TrackUtils.getClosestTrack(this.queue.current as UnresolvedTrack);
			} catch (error: unknown) {
				this.manager.emit("TrackError", this, this.queue.current, error as TrackExceptionEvent);
				if (this.queue[0]) return this.play(this.queue[0]);
				return;
			}
		}
		const encodedTrack = this.queue.current?.track;
		await this.node.rest.updatePlayer({
			guildId: this.guild,
			data: {
				...(encodedTrack !== undefined ? { encodedTrack } : {}),
				...finalOptions,
			},
		});
		Object.assign(this, { position: 0, playing: true });
	}

	/**
	 * Sets the autoplay-state of the player.
	 * @param autoplayState
	 * @param botUser
	 */
	public setAutoplay(autoplayState: boolean, botUser: object) {
		if (typeof autoplayState !== "boolean") throw new TypeError("autoplayState must be a boolean.");
		if (typeof botUser !== "object") throw new TypeError("botUser must be a user-object.");
		this.isAutoplay = autoplayState;
		this.set("Internal_BotUser", botUser);
		return this;
	}

	/**
	 * Prefetches and resolves the next UnresolvedTrack in the queue in-place.
	 * Runs as a fire-and-forget background operation; errors are silently ignored.
	 */
	public async prefetchNext(): Promise<void> {
		const next = this.queue[0];
		if (!next || !TrackUtils.isUnresolvedTrack(next)) return;
		try {
			this.queue[0] = await TrackUtils.getClosestTrack(next as UnresolvedTrack);
		} catch {
			// falls back to on-demand resolution at play time
		}
	}

	/**
	 * Gets recommended tracks and returns an array of tracks.
	 * @param track
	 * @param requester
	 */
	public async getRecommended(track: Track, requester?: string) {
		const node = this.manager.useableNodes;

		if (!node) throw new Error("No available nodes.");

		const hasSpotifyURL = ["spotify.com", "open.spotify.com"].some((url) => track.uri.includes(url));
		const hasYouTubeURL = ["youtube.com", "youtu.be"].some((url) => track.uri.includes(url));

		if (hasSpotifyURL) {
			const res = await node.rest.get(`/v4/info`);
			const info = res as LavalinkInfo;

			const isSpotifyPluginEnabled = info.plugins.some((plugin: { name: string }) => plugin.name === "lavasrc-plugin");
			const isSpotifySourceManagerEnabled = info.sourceManagers.includes("spotify");

			if (isSpotifyPluginEnabled && isSpotifySourceManagerEnabled) {
				const trackID = node.extractSpotifyTrackID(track.uri);
				const artistID = node.extractSpotifyArtistID(track.pluginInfo.artistUrl ?? '');

				let identifier = "";
				if (trackID && artistID) {
					identifier = `sprec:seed_artists=${artistID}&seed_tracks=${trackID}`;
				} else if (trackID) {
					identifier = `sprec:seed_tracks=${trackID}`;
				} else if (artistID) {
					identifier = `sprec:seed_artists=${artistID}`;
				}

				if (identifier) {
					const recommendedResult = (await node.rest.get(`/v4/loadtracks?identifier=${encodeURIComponent(identifier)}`)) as LavalinkResponse;
					if (recommendedResult.loadType === "playlist") {
						const playlistData = recommendedResult.data as PlaylistRawData;
						const recommendedTracks = playlistData.tracks;
						if (recommendedTracks) return recommendedTracks.map((track) => TrackUtils.build(track, requester));
					}
				}
			}
		}

		let videoID = track.uri.substring(track.uri.indexOf("=") + 1);
		if (!hasYouTubeURL) {
			const res = await this.manager.search(`${track.author} - ${track.title}`);
			const track0 = res.tracks[0];
			const track1 = res.tracks[1];
			if (track0) videoID = track0.uri.substring(track0.uri.indexOf("=") + 1);
			else if (track1) videoID = track1.uri.substring(track1.uri.indexOf("=") + 1);
		}
		const searchURI = `https://www.youtube.com/watch?v=${videoID}&list=RD${videoID}`;
		const res = await this.manager.search(searchURI);
		if (res.loadType === "empty" || res.loadType === "error") return;
		let tracks = res.tracks;
		if (res.loadType === "playlist") tracks = res.playlist?.tracks ?? [];
		const filteredTracks = tracks.filter((track) => track.uri !== `https://www.youtube.com/watch?v=${videoID}`);
		if (this.manager.options.replaceYouTubeCredentials) {
			for (const track of filteredTracks) {
				track.author = track.author.replace("- Topic", "");
				track.title = track.title.replace("Topic -", "");
				if (track.title.includes("-")) {
					const parts = track.title.split("-").map((str: string) => str.trim());
					track.author = parts[0] ?? track.author;
					track.title = parts[1] ?? track.title;
				}
			}
		}
		return filteredTracks;
	}

	/**
	 * Sets the player volume.
	 * @param volume
	 */
	public setVolume(volume: number): this {
		if (isNaN(volume)) throw new TypeError("Volume must be a number.");
		this.node.rest.updatePlayer({
			guildId: this.options.guild,
			data: {
				volume,
			},
		});
		this.volume = volume;
		return this;
	}

	/**
	 * Sets the track repeat.
	 * @param repeat
	 */
	public setTrackRepeat(repeat: boolean): this {
		if (typeof repeat !== "boolean") throw new TypeError('Repeat can only be "true" or "false".');
		const oldPlayer = { ...this };
		if (repeat) {
			this.trackRepeat = true;
			this.queueRepeat = false;
			this.dynamicRepeat = false;
		} else {
			this.trackRepeat = false;
			this.queueRepeat = false;
			this.dynamicRepeat = false;
		}
		this.manager.emit("PlayerStateUpdate", oldPlayer, this);
		return this;
	}

	/**
	 * Sets the queue repeat.
	 * @param repeat
	 */
	public setQueueRepeat(repeat: boolean): this {
		if (typeof repeat !== "boolean") throw new TypeError('Repeat can only be "true" or "false".');

		const oldPlayer = { ...this };

		if (repeat) {
			this.trackRepeat = false;
			this.queueRepeat = true;
			this.dynamicRepeat = false;
		} else {
			this.trackRepeat = false;
			this.queueRepeat = false;
			this.dynamicRepeat = false;
		}

		this.manager.emit("PlayerStateUpdate", oldPlayer, this);
		return this;
	}

	/**
	 * Sets the queue to repeat and shuffles the queue after each song.
	 * @param repeat "true" or "false".
	 * @param ms After how many milliseconds to trigger dynamic repeat.
	 */
	public setDynamicRepeat(repeat: boolean, ms: number): this {
		if (typeof repeat !== "boolean") {
			throw new TypeError('Repeat can only be "true" or "false".');
		}

		if (this.queue.size <= 1) {
			throw new RangeError("The queue size must be greater than 1.");
		}

		const oldPlayer = { ...this };

		if (repeat) {
			this.trackRepeat = false;
			this.queueRepeat = false;
			this.dynamicRepeat = true;

			this.dynamicLoopInterval = setInterval(() => {
				if (!this.dynamicRepeat) return;
				const shuffled = [...this.queue].sort(() => Math.random() - 0.5);
				this.queue.clear();
				shuffled.forEach((track) => {
					this.queue.add(track);
				});
			}, ms) as NodeJS.Timeout;
		} else {
			clearInterval(this.dynamicLoopInterval);
			this.trackRepeat = false;
			this.queueRepeat = false;
			this.dynamicRepeat = false;
		}

		this.manager.emit("PlayerStateUpdate", oldPlayer, this);
		return this;
	}

	/** Restarts the current track to the start. */
	public restart(): void {
		if (!this.queue.current?.track) {
			if (this.queue.length) this.play();
			return;
		}

		this.node.rest.updatePlayer({
			guildId: this.guild,
			data: {
				position: 0,
				encodedTrack: this.queue.current?.track,
			},
		});
	}

	/** Stops the current track, optionally give an amount to skip to, e.g 5 would play the 5th song. */
	public stop(amount?: number): this {
		if (typeof amount === "number" && amount > 1) {
			if (amount > this.queue.length) throw new RangeError("Cannot skip more than the queue length.");
			this.queue.splice(0, amount - 1);
		}

		this.node.rest.updatePlayer({
			guildId: this.guild,
			data: {},
		});

		return this;
	}

	/**
	 * Pauses the current track.
	 * @param pause
	 */
	public pause(pause: boolean): this {
		if (typeof pause !== "boolean") throw new RangeError('Pause can only be "true" or "false".');

		if (this.paused === pause || !this.queue.totalSize) return this;

		const oldPlayer = { ...this };

		this.playing = !pause;
		this.paused = pause;

		this.node.rest.updatePlayer({
			guildId: this.guild,
			data: {
				paused: pause,
			},
		});

		this.manager.emit("PlayerStateUpdate", oldPlayer, this);
		return this;
	}

	/** Go back to the previous song. */
	public previous(): this {
		if (this.queue.previous) {
			this.queue.unshift(this.queue.previous);
		}
		this.stop();

		return this;
	}

	/**
	 * Seeks to the position in the current track.
	 * @param position
	 */
	public seek(position: number): this {
		if (!this.queue.current) return this;
		position = Number(position);

		if (isNaN(position)) throw new RangeError("Position must be a number.");
		const duration = this.queue.current.duration ?? 0;
		if (position < 0 || position > duration) position = Math.max(Math.min(position, duration), 0);

		this.position = position;

		this.node.rest.updatePlayer({
			guildId: this.guild,
			data: {
				position: position,
			},
		});

		return this;
	}

	/**
	 * Sets filters for this player
	 * @param filters The filters to apply
	 */
	public setFilters(filters: FilterOptions): Promise<this> {
		// Convert FilterOptions to actual filter properties
		Object.keys(filters).forEach(key => {
			const filtersRecord = this.filters as unknown as Record<string, unknown>;
			const filtersOptions = filters as unknown as Record<string, unknown>;
			if (filtersRecord[key] !== undefined) {
				filtersRecord[key] = filtersOptions[key];
			}
		});

		return this.node.rest.applyFilters(this.guild, filters).then(() => this);
	}

	/**
	 * Clear all filters from this player
	 */
	public clearFilters(): Promise<this> {
		return this.setFilters({});
	}

	/**
	 * Apply bass boost filter
	 * @param gain Boost intensity from 0 to 1
	 */
	public bassBoost(gain = 0.65): Promise<this> {
		return this.setFilters(FilterPresets.bassBoost(gain));
	}

	/**
	 * Apply nightcore filter
	 * @param speed Playback speed (default: 1.12)
	 * @param pitch Pitch adjustment (default: 1.12)
	 */
	public nightcore(speed = 1.12, pitch = 1.12): Promise<this> {
		return this.setFilters(FilterPresets.nightcore(speed, pitch));
	}

	/**
	 * Apply vaporwave filter
	 */
	public vaporwave(): Promise<this> {
		return this.setFilters(FilterPresets.vaporwave());
	}

	/**
	 * Apply pop filter
	 */
	public pop(): Promise<this> {
		return this.setFilters(FilterPresets.pop());
	}

	/**
	 * Apply soft filter
	 */
	public soft(): Promise<this> {
		return this.setFilters(FilterPresets.soft());
	}

	/**
	 * Apply karaoke filter to reduce vocals
	 */
	public karaoke(options: { level?: number; monoLevel?: number; filterBand?: number; filterWidth?: number } = {}): Promise<this> {
		const karaokeOptions = {
			level: options.level ?? 1.0,
			monoLevel: options.monoLevel ?? 1.0,
			filterBand: options.filterBand ?? 220.0,
			filterWidth: options.filterWidth ?? 100.0
		};

		return this.setFilters({ karaoke: karaokeOptions });
	}

	/**
	 * Apply 8D audio effect with rotation
	 * @param rotationHz Rotation speed in Hz (default: 0.2)
	 */
	public eightD(rotationHz = 0.2): Promise<this> {
		return this.setFilters({ rotation: { rotationHz } });
	}

	/**
	 * Apply vibrato effect
	 * @param frequency Frequency of the vibrato effect (default: 2.0)
	 * @param depth Depth of the vibrato effect (default: 0.5)
	 */
	public vibrato(frequency = 2.0, depth = 0.5): Promise<this> {
		return this.setFilters({ vibrato: { frequency, depth } });
	}

	/**
	 * Apply tremolo effect
	 * @param frequency Frequency of the tremolo effect (default: 2.0)
	 * @param depth Depth of the tremolo effect (default: 0.5)
	 */
	public tremolo(frequency = 2.0, depth = 0.5): Promise<this> {
		return this.setFilters({ tremolo: { frequency, depth } });
	}

	/**
	 * Combine multiple filter presets
	 * @param filters Multiple filter options to combine
	 */
	public async combine(...filters: FilterOptions[]): Promise<this> {
		const combined = filters.reduce((acc, filter) => {
			Object.entries(filter).forEach(([key, value]) => {
				if (key === 'equalizer' && acc.equalizer) {
					// For equalizer, merge bands by band number
					const existing = new Map(acc.equalizer.map((band: EqualizerBand) => [band.band, band]));
					(value as EqualizerBand[]).forEach((band: EqualizerBand) => existing.set(band.band, band));
					acc.equalizer = Array.from(existing.values());
				} else {
					// For other filters, just replace
					(acc as unknown as Record<string, unknown>)[key] = value;
				}
			});
			return acc;
		}, {} as FilterOptions);

		return this.setFilters(combined);
	}

	/**
	 * Get lyrics for the current track
	 * @param options Lyrics search options
	 */
	public async fetchLyrics(options: LyricsOptions = {}): Promise<LyricsData | null> {
		if (!this.queue.current) {
			return null;
		}

		if (!this.manager.lyrics) {
			throw new Error("Lyrics system is not enabled. Enable it in the manager options.");
		}

		try {
			// Now compatible with both Track and UnresolvedTrack
			const lyrics = await this.manager.lyrics.search(this.queue.current, options);

			if (lyrics) {
				this.manager.emit("LyricsFound", this, lyrics);
				return lyrics;
			} else {
				this.manager.emit("LyricsNotFound", this, this.queue.current);
				return null;
			}
		} catch (error) {
			console.error("Error fetching lyrics:", error);
			return null;
		}
	}

	/**
	 * Get lyrics for the current track from a specific provider
	 * @param providerName The lyrics provider to use
	 * @param options Lyrics search options
	 */
	public async fetchLyricsFrom(providerName: string, options: LyricsOptions = {}): Promise<LyricsData | null> {
		if (!this.queue.current) {
			return null;
		}

		if (!this.manager.lyrics) {
			throw new Error("Lyrics system is not enabled. Enable it in the manager options.");
		}

		try {
			// Now compatible with both Track and UnresolvedTrack
			const lyrics = await this.manager.lyrics.searchWithProvider(providerName, this.queue.current, options);

			if (lyrics) {
				this.manager.emit("LyricsFound", this, lyrics);
				return lyrics;
			} else {
				this.manager.emit("LyricsNotFound", this, this.queue.current);
				return null;
			}
		} catch (error) {
			console.error(`Error fetching lyrics from ${providerName}:`, error);
			return null;
		}
	}

	/**
	 * Get a list of available lyrics providers
	 */
	public getLyricsProviders(): string[] {
		if (!this.manager.lyrics) {
			throw new Error("Lyrics system is not enabled. Enable it in the manager options.");
		}

		return this.manager.lyrics.getProviders();
	}

	/**
	 * Save the current queue
	 * @param options Save options
	 */
	public saveQueue(options: SaveQueueOptions = {}): Promise<QueueOperationResult> {
		if (!this.manager.queues) {
			throw new Error("Queue manager is not available");
		}

		return this.manager.queues.saveQueue(this, options);
	}

	/**
	 * Load a saved queue
	 * @param queueId The ID of the saved queue
	 * @param options Load options
	 */
	public loadQueue(queueId: string, options: LoadQueueOptions = {}): Promise<QueueOperationResult> {
		if (!this.manager.queues) {
			throw new Error("Queue manager is not available");
		}

		return this.manager.queues.loadQueue(queueId, this, options);
	}

	/**
	 * List all available saved queues for this guild
	 * @param includeGlobal Whether to include global queues
	 */
	public listSavedQueues(includeGlobal = true): Promise<import("./QueueManager").SavedQueue[]> {
		if (!this.manager.queues) {
			throw new Error("Queue manager is not available");
		}

		return this.manager.queues.listQueues(this.guild, includeGlobal);
	}
}

export interface PlayerOptions {
	/** The guild the Player belongs to. */
	guild: string;
	/** The text channel the Player belongs to. */
	textChannel: string;
	/** The voice channel the Player belongs to. */
	voiceChannel?: string;
	/** The node the Player uses. */
	node?: string;
	/** The initial volume the Player will use. */
	volume?: number;
	/** If the player should mute itself. */
	selfMute?: boolean;
	/** If the player should deaf itself. */
	selfDeafen?: boolean;
}

/** If track partials are set some of these will be `undefined` as they were removed. */
export interface Track {
	/** The base64 encoded track. */
	readonly track: string;
	/** The artwork url of the track. */
	readonly artworkUrl: string | undefined;
	/** The track source name. */
	readonly sourceName: TrackSourceName | undefined;
	/** The title of the track. */
	title: string;
	/** The identifier of the track. */
	readonly identifier: string;
	/** The author of the track. */
	author: string;
	/** The duration of the track. */
	readonly duration: number;
	/** The ISRC of the track. */
	readonly isrc: string | undefined;
	/** If the track is seekable. */
	readonly isSeekable: boolean;
	/** If the track is a stream.. */
	readonly isStream: boolean;
	/** The uri of the track. */
	readonly uri: string;
	/** The thumbnail of the track or null if it's a unsupported source. */
	readonly thumbnail: string | null;
	/** The user that requested the track. */
	readonly requester: string | undefined;
	/** Displays the track thumbnail with optional size or null if it's a unsupported source. */
	displayThumbnail(size?: Sizes): string | null;
	/** Additional track info provided by plugins. */
	pluginInfo: TrackPluginInfo;
	/** Add your own data to the track. */
	customData: Record<string, unknown>;
}

export interface TrackPluginInfo {
	albumName?: string;
	albumUrl?: string;
	artistArtworkUrl?: string;
	artistUrl?: string;
	isPreview?: string;
	previewUrl?: string;
}

/** Unresolved tracks can't be played normally, they will resolve before playing into a Track. */
export interface UnresolvedTrack extends Partial<Track> {
	/** The title to search against. */
	title: string;
	/** The author to search against. */
	author?: string;
	/** The duration to search within 1500 milliseconds of the results from YouTube. */
	duration?: number;
	/** Resolves into a Track. */
	resolve(): Promise<void>;
}

export interface PlayOptions {
	/** The position to start the track. */
	readonly startTime?: number;
	/** The position to end the track. */
	readonly endTime?: number;
	/** Whether to not replace the track if a play payload is sent. */
	readonly noReplace?: boolean;
}

export interface EqualizerBand {
	/** The band number being 0 to 14. */
	band: number;
	/** The gain amount being -0.25 to 1.00, 0.25 being double. */
	gain: number;
}
