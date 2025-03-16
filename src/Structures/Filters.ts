import { Band, bassBoostEqualizer, softEqualizer, trebleBassEqualizer, tvEqualizer, vaporwaveEqualizer } from "../Utils/FiltersEqualizers";
import { LithiumXPlayer } from "./Player";

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
		return this.applyFilter({ property: "equalizer", value: bands });
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
			value: karaoke,
		}).setFilterStatus("karaoke", status);
	}

	/** Applies the timescale options specified by the filter. */
	public setTimescale(timescale?: TimescaleOptions): this {
		return this.applyFilter({ property: "timescale", value: timescale });
	}

	/** Applies the vibrato options specified by the filter. */
	public setVibrato(vibrato?: VibratoOptions): this {
		return this.applyFilter({ property: "vibrato", value: vibrato });
	}

	/** Applies the rotation options specified by the filter. */
	public setRotation(rotation?: RotationOptions): this {
		return this.applyFilter({ property: "rotation", value: rotation });
	}

	/** Applies the distortion options specified by the filter. */
	public setDistortion(distortion?: DistortionOptions): this {
		return this.applyFilter({ property: "distortion", value: distortion });
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
			karaoke: false,
			nightcore: false,
			slowmo: false,
			soft: false,
			trebleBass: false,
			tv: false,
			vaporwave: false,
		};

		this.player.filters = new Filters(this.player);
		this.setEqualizer([]);
		this.setDistortion(null);
		this.setKaraoke(null);
		this.setRotation(null);
		this.setTimescale(null);
		this.setVibrato(null);

		await this.updateFilters();
		return this;
	}

	/** Returns the status of the specified filter . */
	public getFilterStatus(filter: keyof AvailableFilters): boolean {
		return this.filterStatus[filter];
	}
}

/** Options for adjusting the timescale of audio. */
interface TimescaleOptions {
	/** The speed factor for the timescale. */
	speed?: number;
	/** The pitch factor for the timescale. */
	pitch?: number;
	/** The rate factor for the timescale. */
	rate?: number;
}

/** Options for applying vibrato effect to audio. */
interface VibratoOptions {
	/** The frequency of the vibrato effect. */
	frequency: number;
	/** * The depth of the vibrato effect.*/
	depth: number;
}

/** Options for applying rotation effect to audio. */
interface RotationOptions {
	/** The rotation speed in Hertz (Hz). */
	rotationHz: number;
}

/** Options for applying karaoke effect to audio. */
interface KaraokeOptions {
	/** The level of karaoke effect. */
	level?: number;
	/** The mono level of karaoke effect. */
	monoLevel?: number;
	/** The filter band of karaoke effect. */
	filterBand?: number;
	/** The filter width of karaoke effect. */
	filterWidth?: number;
}

interface DistortionOptions {
	sinOffset?: number;
	sinScale?: number;
	cosOffset?: number;
	cosScale?: number;
	tanOffset?: number;
	tanScale?: number;
	offset?: number;
	scale?: number;
}

interface AvailableFilters {
	bassboost: boolean;
	distort: boolean;
	eightD: boolean;
	karaoke: boolean;
	nightcore: boolean;
	slowmo: boolean;
	soft: boolean;
	trebleBass: boolean;
	tv: boolean;
	vaporwave: boolean;
}

export { Filters, TimescaleOptions, VibratoOptions, RotationOptions, KaraokeOptions, DistortionOptions, AvailableFilters };