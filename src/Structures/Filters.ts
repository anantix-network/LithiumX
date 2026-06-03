import { Band, bassBoostEqualizer, softEqualizer, trebleBassEqualizer, tvEqualizer, vaporwaveEqualizer } from "../Utils/FiltersEqualizers";
import { LithiumXPlayer } from "./Player";

// Filter options interfaces
export interface TimescaleOptions {
	/** The speed factor for the timescale. */
	speed?: number;
	/** The pitch factor for the timescale. */
	pitch?: number;
	/** The rate factor for the timescale. */
	rate?: number;
}

export interface VibratoOptions {
	/** The frequency of the vibrato effect. */
	frequency: number;
	/** The depth of the vibrato effect.*/
	depth: number;
}

export interface RotationOptions {
	/** The rotation speed in Hertz (Hz). */
	rotationHz: number;
}

export interface KaraokeOptions {
	/** The level of karaoke effect. */
	level?: number;
	/** The mono level of karaoke effect. */
	monoLevel?: number;
	/** The filter band of karaoke effect. */
	filterBand?: number;
	/** The filter width of karaoke effect. */
	filterWidth?: number;
}

export interface DistortionOptions {
	sinOffset?: number;
	sinScale?: number;
	cosOffset?: number;
	cosScale?: number;
	tanOffset?: number;
	tanScale?: number;
	offset?: number;
	scale?: number;
}

export interface EqualizerBand {
	band: number;
	gain: number;
}

export interface FrequencyDepthOptions {
	frequency?: number;
	depth?: number;
}

export interface ChannelMixOptions {
	leftToLeft?: number;
	leftToRight?: number;
	rightToLeft?: number;
	rightToRight?: number;
}

export interface LowPassOptions {
	smoothing?: number;
}

export interface HighSpeedOptions {
	speed?: number;
	pitch?: number;
	rate?: number;
}

export interface AvailableFilters {
	bassboost: boolean;
	distort: boolean;
	eightD: boolean;
	highSpeed: boolean;
	karaoke: boolean;
	nightcore: boolean;
	slowmo: boolean;
	soft: boolean;
	trebleBass: boolean;
	tv: boolean;
	vaporwave: boolean;
}

/**
 * Represents the available audio filters to be applied to a player
 */
export interface FilterOptions {
	volume?: number;
	equalizer?: EqualizerBand[];
	karaoke?: KaraokeOptions;
	timescale?: TimescaleOptions;
	tremolo?: FrequencyDepthOptions;
	vibrato?: FrequencyDepthOptions;
	rotation?: RotationOptions;
	distortion?: DistortionOptions;
	channelMix?: ChannelMixOptions;
	lowPass?: LowPassOptions;
}

class Filters {
	public distortion: DistortionOptions | null;
	public equalizer: Band[];
	public karaoke: KaraokeOptions | null;
	public player: LithiumXPlayer;
	public rotation: RotationOptions | null;
	public timescale: TimescaleOptions | null;
	public vibrato: VibratoOptions | null;
	public volume: number;

	private filterStatus: {
		[key: string]: boolean;
	};

	constructor(player: LithiumXPlayer) {
		this.distortion = null;
		this.equalizer = [];
		this.karaoke = null;
		this.player = player;
		this.rotation = null;
		this.timescale = null;
		this.vibrato = null;
		this.volume = 1.0;
		// Initialize filter status
		this.filterStatus = {
			bassboost: false,
			distort: false,
			eightD: false,
			highSpeed: false,
			karaoke: false,
			nightcore: false,
			slowmo: false,
			soft: false,
			trebleBass: false,
			tv: false,
			vaporwave: false,
		};
	}

	private async updateFilters(): Promise<this> {
		const { distortion, equalizer, karaoke, rotation, timescale, vibrato, volume } = this;

		await this.player.node.rest.updatePlayer({
			data: {
				filters: {
					distortion,
					equalizer,
					karaoke,
					rotation,
					timescale,
					vibrato,
					volume,
				},
			},
			guildId: this.player.guild,
		});

		return this;
	}

	private applyFilter<T extends keyof Filters>(filter: { property: T; value: Filters[T] }, updateFilters: boolean = true): this {
		this[filter.property] = filter.value as this[T];
		if (updateFilters) {
			this.updateFilters();
		}
		return this;
	}

	private setFilterStatus(filter: keyof AvailableFilters, status: boolean): this {
		this.filterStatus[filter] = status;
		return this;
	}

	/**
	 * Sets the equalizer bands and updates the filters.
	 * @param bands - The equalizer bands.
	 */
	public setEqualizer(bands?: Band[]): this {
		return this.applyFilter({ property: "equalizer", value: bands ?? [] });
	}

	/** Applies the distortion audio effect. */
	public distort(): this {
		return this.setDistortion({
			sinOffset: 0,
			sinScale: 0.2,
			cosOffset: 0,
			cosScale: 0.2,
			tanOffset: 0,
			tanScale: 0.2,
			offset: 0,
			scale: 1.2,
		}).setFilterStatus("distort", true);
	}

	/** Applies the karaoke options specified by the filter. */
	public setKaraoke(status: boolean, karaoke?: KaraokeOptions): this {
		return this.applyFilter({
			property: "karaoke",
			value: karaoke ?? null,
		}).setFilterStatus("karaoke", status);
	}

	/** Applies the timescale options specified by the filter. */
	public setTimescale(timescale?: TimescaleOptions | null): this {
		return this.applyFilter({ property: "timescale", value: timescale ?? null });
	}

	/** Applies the vibrato options specified by the filter. */
	public setVibrato(vibrato?: VibratoOptions | null): this {
		return this.applyFilter({ property: "vibrato", value: vibrato ?? null });
	}

	/** Applies the rotation options specified by the filter. */
	public setRotation(rotation?: RotationOptions | null): this {
		return this.applyFilter({ property: "rotation", value: rotation ?? null });
	}

	/** Applies the distortion options specified by the filter. */
	public setDistortion(distortion?: DistortionOptions | null): this {
		return this.applyFilter({ property: "distortion", value: distortion ?? null });
	}
	/**
	 * Set the 8D options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	 */
	public setEightD(status: boolean): this {
		if (status) {
			return this.setRotation({ rotationHz: 0.2 }).setFilterStatus("eightD", status);
		} else {
			return this.setRotation(null).setFilterStatus("eightD", status);
		}
	}
	/**
	 * Set the nightcore options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	*/
	public setNightcore(status: boolean): this {
		if (status) {
			return this.setTimescale({
				speed: 1.1,
				pitch: 1.125,
				rate: 1.05,
			}).setFilterStatus("nightcore", status);
		} else {
			return this.setTimescale(null).setFilterStatus("nightcore", status);
		}
	}
	/**
	 * Set the slowmo options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	*/
	public setSlowmo(status: boolean): this {
		if (status) {
			return this.setTimescale({
				speed: 0.7,
				pitch: 1.0,
				rate: 0.8,
			}).setFilterStatus("slowmo", status);
		} else {
			return this.setTimescale(null).setFilterStatus("slowmo", status);
		}
	}
	/**
	 * Set the high speed options
	 * @param {HighSpeedOptions | false} opts - Options to configure timescale, or false to disable.
	 * @returns {this}
	*/
	public setHighSpeed(opts?: HighSpeedOptions | false): this {
		if (opts === false) {
			return this.setTimescale(null).setFilterStatus('highSpeed', false);
		}
		return this.setTimescale({
			speed: opts?.speed ?? 1.5,
			pitch: opts?.pitch ?? 1.0,
			rate: opts?.rate ?? 1.0,
		}).setFilterStatus('highSpeed', true);
	}

	/**
	 * Set the soft options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	*/
	public setSoft(status: boolean): this {
		return this.setEqualizer(softEqualizer).setFilterStatus("soft", status);
	}
	/**
	 * Set the treble bass options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	 */
	public setTrebleBass(status: boolean): this {
		return this.setEqualizer(trebleBassEqualizer).setFilterStatus("trebleBass", status);
	}
	/**
	 * Set the TV options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	 */
	public setTV(status: boolean): this {
		return this.setEqualizer(tvEqualizer).setFilterStatus("tv", status);
	}

	/**
	 * Set the vaporwave options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	 */
	public setVaporwave(status: boolean): this {
		if (status) {
			return this.setEqualizer(vaporwaveEqualizer).setTimescale({ pitch: 0.55 }).setFilterStatus("vaporwave", status);
		} else {
			return this.setEqualizer([]).setTimescale(null).setFilterStatus("vaporwave", status);
		}
	}

	/**
	 * Set the treble bass options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	*/
	public setBassBoost(status: boolean): this {
		return this.setEqualizer(bassBoostEqualizer).setFilterStatus("bassboost", status);
	}

	/**
	 * Set the distort options
	 * @param {boolean} status - The status to set.
	 * @returns {this}
	 */
	public setDistort(status: boolean): this {
		if (status) {
			return this.setDistortion({
				sinOffset: 0,
				sinScale: 0.2,
				cosOffset: 0,
				cosScale: 0.2,
				tanOffset: 0,
				tanScale: 0.2,
				offset: 0,
				scale: 1.2,
			}).setFilterStatus("distort", status);
		} else {
			return this.setDistortion(null).setFilterStatus("distort", status);
		}
	}

	/**
	 * Set filter 
	 * @param {keyof AvailableFilters} filter
	 * @param {boolean} status 
	 * @returns {this}
	 */
	public async setFilter(filter: keyof AvailableFilters | string, status: boolean) {
		if (!status && typeof status !== "boolean") throw new Error("Status must be a boolean");
		switch (filter) {
			case "bassboost":
				this.setBassBoost(status);
				break;
			case "distort":
				this.setDistort(status);
				break;
			case "eightD":
				this.setEightD(status);
				break;
			case "highSpeed":
				this.setHighSpeed(status ? undefined : false);
				break;
			case "nightcore":
				this.setNightcore(status);
				break;
			case "slowmo":
				this.setSlowmo(status);
				break;
			case "soft":
				this.setSoft(status);
				break;
			case "trebleBass":
				this.setTrebleBass(status);
				break;
			case "tv":
				this.setTV(status);
				break;
			case "vaporwave":
				this.setVaporwave(status);
				break;
			default:
				throw new Error("Invalid filter provided");
		}
		await this.updateFilters().then(() => this).catch((e) => { throw new Error(e) });
		return this;
	}

	/** Removes the audio effects and resets the filter status. */
	public async clearFilters(): Promise<this> {
		this.filterStatus = {
			bassboost: false,
			distort: false,
			eightD: false,
			highSpeed: false,
			karaoke: false,
			nightcore: false,
			slowmo: false,
			soft: false,
			trebleBass: false,
			tv: false,
			vaporwave: false,
		};

		this.equalizer = [];
		this.distortion = null;
		this.karaoke = null;
		this.rotation = null;
		this.timescale = null;
		this.vibrato = null;

		await this.updateFilters();
		return this;
	}

	/** Returns the status of the specified filter . */
	public getFilterStatus(filter: keyof AvailableFilters): boolean {
		return this.filterStatus[filter] ?? false;
	}
}

/**
 * Preset equalizer bands for common audio effects
 */
export class FilterPresets {
	/**
	 * Bass boost filter preset
	 * @param gain How much to boost the bass (0 to 1)
	 */
	static bassBoost(gain = 0.65): FilterOptions {
		// Convert gain to a value between 0 and 1
		const normalizedGain = Math.max(0, Math.min(1, gain));

		// Create equalizer bands with boosted bass
		const bands: EqualizerBand[] = [
			{ band: 0, gain: normalizedGain * 0.6 },
			{ band: 1, gain: normalizedGain * 0.67 },
			{ band: 2, gain: normalizedGain * 0.67 },
			{ band: 3, gain: normalizedGain * 0.4 }
		];

		return { equalizer: bands };
	}

	/**
	 * Nightcore effect preset
	 * @param speed Playback speed (default: 1.12)
	 * @param pitch Pitch adjustment (default: 1.12)
	 */
	static nightcore(speed = 1.12, pitch = 1.12): FilterOptions {
		return {
			timescale: {
				speed,
				pitch,
				rate: 1
			}
		};
	}

	/**
	 * Vaporwave effect preset
	 */
	static vaporwave(): FilterOptions {
		return {
			timescale: {
				speed: 0.8,
				pitch: 0.8,
				rate: 1
			}
		};
	}

	/**
	 * Pop filter preset
	 */
	static pop(): FilterOptions {
		return {
			equalizer: [
				{ band: 0, gain: -0.25 },
				{ band: 1, gain: 0.48 },
				{ band: 2, gain: 0.59 },
				{ band: 3, gain: 0.72 },
				{ band: 4, gain: 0.56 },
				{ band: 5, gain: 0.15 },
				{ band: 6, gain: -0.24 },
				{ band: 7, gain: -0.24 },
				{ band: 8, gain: -0.16 },
				{ band: 9, gain: -0.16 },
				{ band: 10, gain: 0 },
				{ band: 11, gain: 0 },
				{ band: 12, gain: 0 },
				{ band: 13, gain: 0 },
				{ band: 14, gain: 0 }
			]
		};
	}

	/**
	 * Soft filter preset
	 */
	static soft(): FilterOptions {
		return {
			equalizer: [
				{ band: 0, gain: 0 },
				{ band: 1, gain: 0 },
				{ band: 2, gain: 0 },
				{ band: 3, gain: 0 },
				{ band: 4, gain: 0 },
				{ band: 5, gain: 0 },
				{ band: 6, gain: 0 },
				{ band: 7, gain: 0 },
				{ band: 8, gain: -0.25 },
				{ band: 9, gain: -0.25 },
				{ band: 10, gain: -0.25 },
				{ band: 11, gain: -0.25 },
				{ band: 12, gain: -0.25 },
				{ band: 13, gain: -0.25 }
			]
		};
	}

	/**
	 * Clear all applied filters
	 */
	static clear(): FilterOptions {
		return {};
	}

	/**
	 * High speed effect preset
	 * @param speed Playback speed (default: 1.5)
	 * @param pitch Pitch adjustment (default: 1.0)
	 * @param rate Rate adjustment (default: 1.0)
	 */
	static highSpeed(speed = 1.5, pitch = 1.0, rate = 1.0): FilterOptions {
		return { timescale: { speed, pitch, rate } };
	}
}

export { Filters };