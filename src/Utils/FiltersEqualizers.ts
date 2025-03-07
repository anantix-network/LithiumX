/** Represents an equalizer band. */
interface Band {
	/** The index of the equalizer band. */
	band: number;
	/** The gain value of the equalizer band. */
	gain: number;
}

const bassBoostEqualizer: Band[] = [
	{ band: 0, gain: 0.2 },
	{ band: 1, gain: 0.15 },
	{ band: 2, gain: 0.1 },
	{ band: 3, gain: 0.05 },
	{ band: 4, gain: 0.0 },
	{ band: 5, gain: -0.05 },
	{ band: 6, gain: -0.1 },
	{ band: 7, gain: -0.1 },
	{ band: 8, gain: -0.1 },
	{ band: 9, gain: -0.1 },
	{ band: 10, gain: -0.1 },
	{ band: 11, gain: -0.1 },
	{ band: 12, gain: -0.1 },
	{ band: 13, gain: -0.1 },
	{ band: 14, gain: -0.1 },
];

const softEqualizer: Band[] = [
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
	{ band: 13, gain: -0.25 },
];

const tvEqualizer: Band[] = [
	{ band: 0, gain: 0 },
	{ band: 1, gain: 0 },
	{ band: 2, gain: 0 },
	{ band: 3, gain: 0 },
	{ band: 4, gain: 0 },
	{ band: 5, gain: 0 },
	{ band: 6, gain: 0 },
	{ band: 7, gain: 0.65 },
	{ band: 8, gain: 0.65 },
	{ band: 9, gain: 0.65 },
	{ band: 10, gain: 0.65 },
	{ band: 11, gain: 0.65 },
	{ band: 12, gain: 0.65 },
	{ band: 13, gain: 0.65 },
];

const trebleBassEqualizer: Band[] = [
	{ band: 0, gain: 0.6 },
	{ band: 1, gain: 0.67 },
	{ band: 2, gain: 0.67 },
	{ band: 3, gain: 0 },
	{ band: 4, gain: -0.5 },
	{ band: 5, gain: 0.15 },
	{ band: 6, gain: -0.45 },
	{ band: 7, gain: 0.23 },
	{ band: 8, gain: 0.35 },
	{ band: 9, gain: 0.45 },
	{ band: 10, gain: 0.55 },
	{ band: 11, gain: 0.6 },
	{ band: 12, gain: 0.55 },
	{ band: 13, gain: 0 },
];

const vaporwaveEqualizer: Band[] = [
	{ band: 0, gain: 0 },
	{ band: 1, gain: 0 },
	{ band: 2, gain: 0 },
	{ band: 3, gain: 0 },
	{ band: 4, gain: 0 },
	{ band: 5, gain: 0 },
	{ band: 6, gain: 0 },
	{ band: 7, gain: 0 },
	{ band: 8, gain: 0.15 },
	{ band: 9, gain: 0.15 },
	{ band: 10, gain: 0.15 },
	{ band: 11, gain: 0.15 },
	{ band: 12, gain: 0.15 },
	{ band: 13, gain: 0.15 },
];

export { Band, bassBoostEqualizer, softEqualizer, tvEqualizer, trebleBassEqualizer, vaporwaveEqualizer };