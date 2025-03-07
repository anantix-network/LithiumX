/* eslint-disable @typescript-eslint/no-unused-vars*/
import { LithiumXManager } from "./Manager";
import { LithiumXNode, NodeStats } from "./Node";
import { LithiumXPlayer, Track, UnresolvedTrack } from "./Player";
import { LithiumXQueue } from "./Queue";

/** @hidden */
const TRACK_SYMBOL = Symbol("track"),
	/** @hidden */
	UNRESOLVED_TRACK_SYMBOL = Symbol("unresolved"),
	SIZES = ["0", "1", "2", "3", "default", "mqdefault", "hqdefault", "maxresdefault"];

/** @hidden */
const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

abstract class TrackUtils {
	static trackPartial: string[] | null = null;
	private static manager: LithiumXManager;

	/** @hidden */
	public static init(manager: LithiumXManager): void {
		this.manager = manager;
	}

	static setTrackPartial(partial: string[]): void {
		if (!Array.isArray(partial) || !partial.every((str) => typeof str === "string")) throw new Error("Provided partial is not an array or not a string array.");
		if (!partial.includes("track")) partial.unshift("track");

		this.trackPartial = partial;
	}

	/**
	 * Checks if the provided argument is a valid Track or UnresolvedTrack, if provided an array then every element will be checked.
	 * @param trackOrTracks
	 */
	static validate(trackOrTracks: unknown): boolean {
		if (typeof trackOrTracks === "undefined") throw new RangeError("Provided argument must be present.");

		if (Array.isArray(trackOrTracks) && trackOrTracks.length) {
			for (const track of trackOrTracks) {
				if (!(track[TRACK_SYMBOL] || track[UNRESOLVED_TRACK_SYMBOL])) return false;
			}
			return true;
		}

		return (trackOrTracks[TRACK_SYMBOL] || trackOrTracks[UNRESOLVED_TRACK_SYMBOL]) === true;
	}

	/**
	 * Checks if the provided argument is a valid UnresolvedTrack.
	 * @param track
	 */
	static isUnresolvedTrack(track: unknown): boolean {
		if (typeof track === "undefined") throw new RangeError("Provided argument must be present.");
		return track[UNRESOLVED_TRACK_SYMBOL] === true;
	}

	/**
	 * Checks if the provided argument is a valid Track.
	 * @param track
	 */
	static isTrack(track: unknown): boolean {
		if (typeof track === "undefined") throw new RangeError("Provided argument must be present.");
		return track[TRACK_SYMBOL] === true;
	}

	/**
	 * Builds a Track from the raw data from Lavalink and a optional requester.
	 * @param data The raw data from Lavalink.
	 * @param requester The user who requested the track.
	 */
	static build(data: TrackData, requester?: string): Track {
		if (typeof data === "undefined") throw new RangeError('Argument "data" must be present.');

		try {
			const track: Track = {
				track: data.encoded,
				title: data.info.title,
				identifier: data.info.identifier,
				author: data.info.author,
				duration: data.info.length,
				isrc: data.info?.isrc,
				isSeekable: data.info.isSeekable,
				isStream: data.info.isStream,
				uri: data.info.uri,
				artworkUrl: data.info?.artworkUrl,
				sourceName: data.info?.sourceName,
				thumbnail: data.info.uri.includes("youtube") ? `https://img.youtube.com/vi/${data.info.identifier}/default.jpg` : null,
				displayThumbnail(size = "default"): string | null {
					const finalSize = SIZES.find((s) => s === size) ?? "default";
					return this.uri.includes("youtube") ? `https://img.youtube.com/vi/${data.info.identifier}/${finalSize}.jpg` : null;
				},
				requester,
				pluginInfo: data.pluginInfo,
				customData: {},
			};

			track.displayThumbnail = track.displayThumbnail.bind(track);

			if (this.trackPartial) {
				for (const key of Object.keys(track)) {
					if (this.trackPartial.includes(key)) continue;
					delete track[key];
				}
			}

			Object.defineProperty(track, TRACK_SYMBOL, {
				configurable: true,
				value: true,
			});

			return track;
		} catch (error) {
			throw new RangeError(`Argument "data" is not a valid track: ${error.message}`);
		}
	}

	/**
	 * Builds a UnresolvedTrack to be resolved before being played  .
	 * @param query The query to search for.
	 * @param requester The user who requested the track.
	 */
	static buildUnresolved(query: string | UnresolvedQuery, requester?: string): UnresolvedTrack {
		if (typeof query === "undefined") throw new RangeError('Argument "query" must be present.');

		let unresolvedTrack: Partial<UnresolvedTrack> = {
			requester,
			async resolve(): Promise<void> {
				const resolved = await TrackUtils.getClosestTrack(this);
				Object.getOwnPropertyNames(this).forEach((prop) => delete this[prop]);
				Object.assign(this, resolved);
			},
		};

		if (typeof query === "string") unresolvedTrack.title = query;
		else unresolvedTrack = { ...unresolvedTrack, ...query };

		Object.defineProperty(unresolvedTrack, UNRESOLVED_TRACK_SYMBOL, {
			configurable: true,
			value: true,
		});

		return unresolvedTrack as UnresolvedTrack;
	}

	static async getClosestTrack(unresolvedTrack: UnresolvedTrack): Promise<Track> {
		if (!TrackUtils.manager) throw new RangeError("Manager has not been initiated.");

		if (!TrackUtils.isUnresolvedTrack(unresolvedTrack)) throw new RangeError("Provided track is not a UnresolvedTrack.");

		const query = unresolvedTrack.uri ? unresolvedTrack.uri : [unresolvedTrack.author, unresolvedTrack.title].filter(Boolean).join(" - ");
		const res = await TrackUtils.manager.search(query, unresolvedTrack.requester);

		if (unresolvedTrack.author) {
			const channelNames = [unresolvedTrack.author, `${unresolvedTrack.author} - Topic`];

			const originalAudio = res.tracks.find((track) => {
				return (
					channelNames.some((name) => new RegExp(`^${escapeRegExp(name)}$`, "i").test(track.author)) ||
					new RegExp(`^${escapeRegExp(unresolvedTrack.title)}$`, "i").test(track.title)
				);
			});

			if (originalAudio) return originalAudio;
		}

		if (unresolvedTrack.duration) {
			const sameDuration = res.tracks.find((track) => track.duration >= unresolvedTrack.duration - 1500 && track.duration <= unresolvedTrack.duration + 1500);

			if (sameDuration) return sameDuration;
		}

		const finalTrack = res.tracks[0];
		finalTrack.customData = unresolvedTrack.customData;
		return finalTrack;
	}
}

/** Gets or extends structures to extend the built in, or already extended, classes to add more functionality. */
abstract class Structure {
	/**
	 * Extends a class.
	 * @param name
	 * @param extender
	 */
	public static extend<K extends keyof Extendable, T extends Extendable[K]>(name: K, extender: (target: Extendable[K]) => T): T {
		if (!structures[name]) throw new TypeError(`"${name} is not a valid structure`);
		const extended = extender(structures[name]);
		structures[name] = extended;
		return extended;
	}

	/**
	 * Get a structure from available structures by name.
	 * @param name
	 */
	public static get<K extends keyof Extendable>(name: K): Extendable[K] {
		const structure = structures[name];
		if (!structure) throw new TypeError('"structure" must be provided.');
		return structure;
	}
}

class Plugin {
	public load(manager: LithiumXManager): void { }
	public unload(manager: LithiumXManager): void { }
}

const structures = {
	Player: LithiumXPlayer,
	Queue: LithiumXQueue,
	Node: LithiumXNode,
};

interface UnresolvedQuery {
	/** The title of the unresolved track. */
	title: string;
	/** The author of the unresolved track. If provided it will have a more precise search. */
	author?: string;
	/** The duration of the unresolved track. If provided it will have a more precise search. */
	duration?: number;
}

type Sizes = "0" | "1" | "2" | "3" | "default" | "mqdefault" | "hqdefault" | "maxresdefault";

type LoadType = "track" | "playlist" | "search" | "empty" | "error";

type State = "CONNECTED" | "CONNECTING" | "DISCONNECTED" | "DISCONNECTING" | "DESTROYING" | "MOVING";

type PlayerEvents = TrackStartEvent | TrackEndEvent | TrackStuckEvent | TrackExceptionEvent | WebSocketClosedEvent;

type PlayerEventType = "TrackStartEvent" | "TrackEndEvent" | "TrackExceptionEvent" | "TrackStuckEvent" | "WebSocketClosedEvent";

type TrackEndReason = "finished" | "loadFailed" | "stopped" | "replaced" | "cleanup";

type Severity = "common" | "suspicious" | "fault";

interface TrackData {
	/** The track information. */
	encoded: string;
	/** The detailed information of the track. */
	info: TrackDataInfo;
	/** Additional track info provided by plugins. */
	pluginInfo: Record<string, string>;
}

interface TrackDataInfo {
	identifier: string;
	isSeekable: boolean;
	author: string;
	length: number;
	isrc?: string;
	isStream: boolean;
	title: string;
	uri?: string;
	artworkUrl?: string;
	sourceName?: TrackSourceName;
}

type TrackSourceName = "deezer" | "spotify" | "soundcloud" | "youtube";

interface Extendable {
	Player: typeof LithiumXPlayer;
	Queue: typeof LithiumXQueue;
	Node: typeof LithiumXNode;
}

interface VoiceState {
	op: "voiceUpdate";
	guildId: string;
	event: VoiceServer;
	sessionId?: string;
}

interface VoiceServer {
	token: string;
	guild_id: string;
	endpoint: string;
}

interface VoiceState {
	guild_id: string;
	user_id: string;
	session_id: string;
	channel_id: string;
}

interface VoicePacket {
	t?: "VOICE_SERVER_UPDATE" | "VOICE_STATE_UPDATE";
	d: VoiceState | VoiceServer;
}

interface NodeMessage extends NodeStats {
	type: PlayerEventType;
	op: "stats" | "playerUpdate" | "event";
	guildId: string;
}

interface PlayerEvent {
	op: "event";
	type: PlayerEventType;
	guildId: string;
}

interface Exception {
	message: string;
	severity: Severity;
	cause: string;
}

interface TrackStartEvent extends PlayerEvent {
	type: "TrackStartEvent";
	track: TrackData;
}

interface TrackEndEvent extends PlayerEvent {
	type: "TrackEndEvent";
	track: TrackData;
	reason: TrackEndReason;
}

interface TrackExceptionEvent extends PlayerEvent {
	exception?: Exception;
	guildId: string;
	type: "TrackExceptionEvent";
}

interface TrackStuckEvent extends PlayerEvent {
	type: "TrackStuckEvent";
	thresholdMs: number;
}

interface WebSocketClosedEvent extends PlayerEvent {
	type: "WebSocketClosedEvent";
	code: number;
	reason: string;
	byRemote: boolean;
}

interface PlayerUpdate {
	op: "playerUpdate";
	/** The guild id of the player. */
	guildId: string;
	state: {
		/** Unix timestamp in milliseconds. */
		time: number;
		/** The position of the track in milliseconds. */
		position: number;
		/** Whether Lavalink is connected to the voice gateway. */
		connected: boolean;
		/** The ping of the node to the Discord voice server in milliseconds (-1 if not connected). */
		ping: number;
	};
}


export {
	TrackUtils,
	Structure,
	Plugin,
	UnresolvedQuery,
	Sizes,
	LoadType,
	State,
	PlayerEvents,
	PlayerEventType,
	TrackEndReason,
	Severity,
	TrackData,
	TrackDataInfo,
	TrackSourceName,
	Extendable,
	VoiceState,
	VoiceServer,
	VoicePacket,
	NodeMessage,
	PlayerEvent,
	Exception,
	TrackStartEvent,
	TrackEndEvent,
	TrackExceptionEvent,
	TrackStuckEvent,
	WebSocketClosedEvent,
	PlayerUpdate
}