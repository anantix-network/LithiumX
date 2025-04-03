export * from "./Structures/Manager";
export * from "./Structures/Node";
export * from "./Structures/Player";
export * from "./Structures/Queue";
export * from "./Structures/Utils";
export * from "./Structures/Filters";
export * from "./Structures/Rest";
export * from "./Utils/FiltersEqualizers";
export * from "./Utils/ManagerCheck";
export * from "./Utils/NodeCheck";
export * from "./Utils/PlayerCheck";

export * from "./Structures/Lyrics";
export * from "./LyricsProviders/GeniusProvider";

export * from "./Structures/QueueManager";

export * from "./Structures/Analytics";
export * from "./Structures/Visualization";

// Export filter-related types and presets
export {
    FilterOptions,
    FilterPresets,
    EqualizerBand,
    KaraokeOptions,
    TimescaleOptions,
    FrequencyDepthOptions,
    RotationOptions,
    DistortionOptions,
    ChannelMixOptions,
    LowPassOptions
} from "./Structures/Filters";