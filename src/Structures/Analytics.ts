import { LithiumXManager } from "./Manager";
import { LithiumXPlayer, Track, UnresolvedTrack } from "./Player";
import { StorageStrategy } from "./Node";
import fs from "fs";
import path from "path";

/**
 * Types of analytics data
 */
export type AnalyticsDataType = 'tracks' | 'artists' | 'users' | 'genres' | 'sessions';

/**
 * Interface for analytics data
 */
export interface AnalyticsData {
    /** Guild ID this data belongs to */
    guildId: string;
    /** Statistics about tracks */
    tracks: {
        /** Map of track IDs to play count */
        playCount: Record<string, TrackPlayStats>;
        /** Most recently played tracks */
        recentlyPlayed: RecentTrack[];
        /** Most skipped tracks */
        mostSkipped: Record<string, number>;
    };
    /** Statistics about artists */
    artists: {
        /** Map of artist names to play count */
        playCount: Record<string, number>;
        /** Total play time per artist in ms */
        playTime: Record<string, number>;
    };
    /** Statistics about users */
    users: {
        /** Map of user IDs to request count */
        requestCount: Record<string, number>;
        /** Map of user IDs to their favorite tracks */
        favorites: Record<string, string[]>;
    };
    /** Sessions data */
    sessions: {
        /** Total listening time in ms */
        totalListeningTime: number;
        /** Average session duration in ms */
        averageSessionDuration: number;
        /** Peak listening times (hour of day -> count) */
        peakTimes: Record<number, number>;
        /** Music activity by day of week (0-6) */
        activityByDay: Record<number, number>;
    };
    /** When this data was last updated */
    lastUpdated: number;
}

/**
 * Interface for track play statistics
 */
export interface TrackPlayStats {
    /** Number of times played */
    count: number;
    /** Total play time in ms */
    totalPlayTime: number;
    /** Average listening percentage */
    averageListeningPercentage: number;
    /** Number of times skipped */
    skips: number;
    /** Whether this track is typically skipped */
    isFrequentlySkipped: boolean;
}

/**
 * Interface for recently played tracks
 */
export interface RecentTrack {
    /** Track ID */
    trackId: string;
    /** Track title */
    title: string;
    /** Track author/artist */
    author: string;
    /** When the track was played */
    playedAt: number;
    /** User who requested the track */
    requestedBy: string | null;
}

/**
 * Interface for session data
 */
export interface SessionData {
    /** Session ID */
    id: string;
    /** Guild ID */
    guildId: string;
    /** Start time */
    startTime: number;
    /** End time (or null if ongoing) */
    endTime: number | null;
    /** Tracks played in this session */
    tracksPlayed: string[];
    /** Users active in this session */
    activeUsers: string[];
    /** Total duration of music played */
    totalPlayTime: number;
}

/**
 * Options for analytics system
 */
export interface AnalyticsOptions {
    /** Whether to enable analytics */
    enabled?: boolean;
    /** Path to store analytics data */
    storagePath?: string;
    /** Custom storage implementation */
    storage?: StorageStrategy;
    /** How often to save analytics data in ms */
    saveInterval?: number;
    /** How much history to keep (in days) */
    historyRetention?: number;
    /** Whether to track user activity */
    trackUsers?: boolean;
    /** Whether to anonymize user data */
    anonymizeUsers?: boolean;
}

/**
 * Analytics system for tracking music usage
 */
export class Analytics {
    private manager: LithiumXManager;
    private data: Map<string, AnalyticsData> = new Map();
    private sessions: Map<string, SessionData> = new Map();
    private storage: StorageStrategy;
    private storagePath: string;
    private saveInterval: NodeJS.Timeout;
    private options: Required<AnalyticsOptions>;
    private trackEndListeners: Map<string, number> = new Map();

    /**
     * Create a new Analytics instance
     * @param manager LithiumX manager
     * @param options Configuration options
     */
    constructor(manager: LithiumXManager, options: AnalyticsOptions = {}) {
        this.manager = manager;

        // Default options
        this.options = {
            enabled: true,
            storagePath: path.resolve("./analytics"),
            storage: null,
            saveInterval: 300000, // 5 minutes
            historyRetention: 30, // 30 days
            trackUsers: true,
            anonymizeUsers: false,
            ...options
        };

        this.storagePath = this.options.storagePath;

        // Create storage directory if needed
        if (!this.options.storage) {
            if (!fs.existsSync(this.storagePath)) {
                fs.mkdirSync(this.storagePath, { recursive: true });
            }
            this.storage = new FileAnalyticsStorage(this.storagePath);
        } else {
            this.storage = this.options.storage;
        }

        // Initialize data and set up event listeners
        if (this.options.enabled) {
            this.loadData();
            this.registerEventListeners();

            // Set up regular saving
            this.saveInterval = setInterval(() => {
                this.saveData();
            }, this.options.saveInterval);
        }
    }

    /**
     * Register event listeners for tracking
     */
    private registerEventListeners(): void {
        // Track when tracks start playing
        this.manager.on("TrackStart", (player, track) => {
            if (!this.options.enabled) return;

            const guildId = player.guild;
            this.ensureGuildData(guildId);

            // Track this play
            this.trackPlay(guildId, track);

            // Store track start time to calculate play duration later
            this.trackEndListeners.set(`${guildId}-${track.identifier}`, Date.now());

            // Update session data
            this.updateSession(player, track);
        });

        // Track when tracks end
        this.manager.on("TrackEnd", (player, track, payload) => {
            if (!this.options.enabled) return;

            const guildId = player.guild;
            const startTimeKey = `${guildId}-${track.identifier}`;
            const startTime = this.trackEndListeners.get(startTimeKey);

            if (startTime) {
                // Calculate duration played
                const duration = Date.now() - startTime;
                const percentage = Math.min(100, Math.round((duration / track.duration) * 100));

                // Update play statistics
                this.updatePlayStats(guildId, track, duration, percentage, payload.reason === "stopped");
                this.trackEndListeners.delete(startTimeKey);
            }
        });

        // Track when players are destroyed
        this.manager.on("PlayerDestroy", (player) => {
            if (!this.options.enabled) return;

            // End current session
            this.endSession(player.guild);
        });

        // Track skips through the QueueEnd event
        this.manager.on("QueueEnd", (player, track) => {
            if (!this.options.enabled) return;

            // End current session
            this.endSession(player.guild);
        });
    }

    /**
     * Ensure data exists for a guild
     * @param guildId Guild ID
     */
    private ensureGuildData(guildId: string): AnalyticsData {
        if (!this.data.has(guildId)) {
            const newData: AnalyticsData = {
                guildId,
                tracks: {
                    playCount: {},
                    recentlyPlayed: [],
                    mostSkipped: {}
                },
                artists: {
                    playCount: {},
                    playTime: {}
                },
                users: {
                    requestCount: {},
                    favorites: {}
                },
                sessions: {
                    totalListeningTime: 0,
                    averageSessionDuration: 0,
                    peakTimes: {},
                    activityByDay: {}
                },
                lastUpdated: Date.now()
            };

            this.data.set(guildId, newData);
        }

        return this.data.get(guildId);
    }

    /**
     * Track a new play
     * @param guildId Guild ID
     * @param track Track that started playing
     */
    private trackPlay(guildId: string, track: Track): void {
        const analytics = this.ensureGuildData(guildId);
        const trackId = track.identifier;
        const artistName = track.author;

        // Track play count
        if (!analytics.tracks.playCount[trackId]) {
            analytics.tracks.playCount[trackId] = {
                count: 0,
                totalPlayTime: 0,
                averageListeningPercentage: 0,
                skips: 0,
                isFrequentlySkipped: false
            };
        }
        analytics.tracks.playCount[trackId].count++;

        // Track artist popularity
        if (!analytics.artists.playCount[artistName]) {
            analytics.artists.playCount[artistName] = 0;
            analytics.artists.playTime[artistName] = 0;
        }
        analytics.artists.playCount[artistName]++;

        // Add to recently played
        const recentTrack: RecentTrack = {
            trackId: trackId,
            title: track.title,
            author: track.author,
            playedAt: Date.now(),
            requestedBy: track.requester
        };

        // Keep only the last 50 tracks
        analytics.tracks.recentlyPlayed.unshift(recentTrack);
        if (analytics.tracks.recentlyPlayed.length > 50) {
            analytics.tracks.recentlyPlayed = analytics.tracks.recentlyPlayed.slice(0, 50);
        }

        // Track user request if enabled
        if (this.options.trackUsers && track.requester) {
            const userId = this.options.anonymizeUsers
                ? this.anonymizeUser(track.requester)
                : track.requester;

            if (!analytics.users.requestCount[userId]) {
                analytics.users.requestCount[userId] = 0;
                analytics.users.favorites[userId] = [];
            }

            analytics.users.requestCount[userId]++;

            // Add to user favorites if not already there
            if (!analytics.users.favorites[userId].includes(trackId) &&
                analytics.users.favorites[userId].length < 20) {
                analytics.users.favorites[userId].push(trackId);
            }
        }

        // Track time of day activity
        const hour = new Date().getHours();
        analytics.sessions.peakTimes[hour] = (analytics.sessions.peakTimes[hour] || 0) + 1;

        // Track day of week
        const day = new Date().getDay();
        analytics.sessions.activityByDay[day] = (analytics.sessions.activityByDay[day] || 0) + 1;

        analytics.lastUpdated = Date.now();
    }

    /**
     * Update play statistics for a track
     * @param guildId Guild ID
     * @param track The track
     * @param duration Duration played in ms
     * @param percentage Percentage of track played
     * @param skipped Whether track was skipped
     */
    private updatePlayStats(guildId: string, track: Track, duration: number, percentage: number, skipped: boolean): void {
        const analytics = this.ensureGuildData(guildId);
        const trackId = track.identifier;
        const artistName = track.author;

        if (!analytics.tracks.playCount[trackId]) return;

        const stats = analytics.tracks.playCount[trackId];

        // Update play time
        stats.totalPlayTime += duration;

        // Update average listening percentage
        const oldAvg = stats.averageListeningPercentage;
        const playCount = stats.count;
        stats.averageListeningPercentage = ((oldAvg * (playCount - 1)) + percentage) / playCount;

        // Update artist play time
        analytics.artists.playTime[artistName] =
            (analytics.artists.playTime[artistName] || 0) + duration;

        // Track skip behavior
        if (skipped) {
            stats.skips++;
            if (!analytics.tracks.mostSkipped[trackId]) {
                analytics.tracks.mostSkipped[trackId] = 0;
            }
            analytics.tracks.mostSkipped[trackId]++;

            // Mark as frequently skipped if skipped >50% of the time
            stats.isFrequentlySkipped = stats.skips / stats.count > 0.5;
        }

        analytics.lastUpdated = Date.now();
    }

    /**
     * Create or update session data
     * @param player Player instance
     * @param currentTrack The current track
     */
    private updateSession(player: LithiumXPlayer, currentTrack: Track): void {
        const guildId = player.guild;
        let session = this.sessions.get(guildId);

        // Create new session if none exists or if the previous one ended
        if (!session || session.endTime !== null) {
            const sessionId = `session-${guildId}-${Date.now()}`;
            session = {
                id: sessionId,
                guildId,
                startTime: Date.now(),
                endTime: null,
                tracksPlayed: [],
                activeUsers: [],
                totalPlayTime: 0
            };
            this.sessions.set(guildId, session);
        }

        // Add track to session
        if (!session.tracksPlayed.includes(currentTrack.identifier)) {
            session.tracksPlayed.push(currentTrack.identifier);
        }

        // Add user to session
        if (currentTrack.requester && !session.activeUsers.includes(currentTrack.requester)) {
            session.activeUsers.push(currentTrack.requester);
        }
    }

    /**
     * End a session and update analytics
     * @param guildId Guild ID
     */
    private endSession(guildId: string): void {
        const session = this.sessions.get(guildId);
        if (!session || session.endTime !== null) return;

        session.endTime = Date.now();
        const sessionDuration = session.endTime - session.startTime;

        // Update analytics
        const analytics = this.ensureGuildData(guildId);
        analytics.sessions.totalListeningTime += sessionDuration;

        // Calculate average session duration
        const totalSessions = this.getTotalSessionCount(guildId);
        const oldAvg = analytics.sessions.averageSessionDuration;

        analytics.sessions.averageSessionDuration =
            ((oldAvg * (totalSessions - 1)) + sessionDuration) / totalSessions;

        analytics.lastUpdated = Date.now();

        // Save session data
        this.saveSession(session);
    }

    /**
     * Get the total count of sessions for a guild
     * @param guildId Guild ID
     */
    private getTotalSessionCount(guildId: string): number {
        // This is a simplified implementation
        return 1; // In a real implementation, this would count from storage
    }

    /**
     * Save a session to storage
     * @param session The session to save
     */
    private async saveSession(session: SessionData): Promise<void> {
        try {
            await this.storage.save(`sessions/${session.guildId}/${session.id}`, session);
        } catch (error) {
            console.error(`Error saving session data:`, error);
        }
    }

    /**
     * Anonymize user ID for privacy
     * @param userId User ID to anonymize
     */
    private anonymizeUser(userId: string): string {
        // Simple hashing for anonymization
        // In production, you'd want a stronger method
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            const char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return `user-${hash.toString(16)}`;
    }

    /**
     * Load analytics data from storage
     */
    private async loadData(): Promise<void> {
        try {
            // Get all guild IDs from storage
            const guildKeys = await this.storage.getAll()
                .then(keys => keys.filter(key => key.startsWith('guilds/')));

            // Load data for each guild
            for (const key of guildKeys) {
                try {
                    const guildId = key.split('/')[1];
                    const data = await this.storage.load(key);
                    if (data && this.isValidAnalyticsData(data)) {
                        this.data.set(guildId, data);
                    }
                } catch (error) {
                    console.error(`Error loading analytics for ${key}:`, error);
                }
            }
        } catch (error) {
            console.error("Error loading analytics data:", error);
        }
    }

    /**
     * Save all analytics data to storage
     */
    public async saveData(): Promise<void> {
        try {
            for (const [guildId, guildData] of this.data.entries()) {
                await this.storage.save(`guilds/${guildId}`, guildData);
            }
        } catch (error) {
            console.error("Error saving analytics data:", error);
        }
    }

    /**
     * Type guard for analytics data
     * @param data Data to validate
     */
    private isValidAnalyticsData(data: any): data is AnalyticsData {
        return data &&
            typeof data.guildId === 'string' &&
            data.tracks &&
            data.artists &&
            data.users &&
            data.sessions;
    }

    /**
     * Get analytics data for a specific guild
     * @param guildId Guild ID
     */
    public getAnalytics(guildId: string): AnalyticsData | null {
        return this.data.get(guildId) || null;
    }

    /**
     * Get the most played tracks for a guild
     * @param guildId Guild ID
     * @param limit Number of tracks to return
     */
    public getMostPlayedTracks(guildId: string, limit = 10): Array<{ trackId: string, count: number }> {
        const analytics = this.data.get(guildId);
        if (!analytics) return [];

        // Convert to array and sort
        return Object.entries(analytics.tracks.playCount)
            .map(([trackId, stats]) => ({ trackId, count: stats.count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }

    /**
     * Get most popular artists for a guild
     * @param guildId Guild ID
     * @param limit Number of artists to return
     */
    public getTopArtists(guildId: string, limit = 10): Array<{ artist: string, count: number }> {
        const analytics = this.data.get(guildId);
        if (!analytics) return [];

        return Object.entries(analytics.artists.playCount)
            .map(([artist, count]) => ({ artist, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }

    /**
     * Get active users for a guild
     * @param guildId Guild ID
     * @param limit Number of users to return
     */
    public getActiveUsers(guildId: string, limit = 10): Array<{ userId: string, count: number }> {
        if (!this.options.trackUsers) return [];

        const analytics = this.data.get(guildId);
        if (!analytics) return [];

        return Object.entries(analytics.users.requestCount)
            .map(([userId, count]) => ({ userId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }

    /**
     * Get personalized recommendations for a user based on their history
     * @param guildId Guild ID
     * @param userId User ID
     * @param limit Number of recommendations
     */
    public getUserRecommendations(guildId: string, userId: string, limit = 5): string[] {
        if (!this.options.trackUsers) return [];

        const analytics = this.data.get(guildId);
        if (!analytics) return [];

        const userIdKey = this.options.anonymizeUsers
            ? this.anonymizeUser(userId)
            : userId;

        const favorites = analytics.users.favorites[userIdKey] || [];
        if (favorites.length === 0) return [];

        // This is a simplified recommendation algorithm
        // In a real system, you'd want to use collaborative filtering or similar

        // Start with favorite artists
        const favoriteArtists = new Set<string>();
        favorites.forEach(trackId => {
            const track = this.getTrackData(guildId, trackId);
            if (track) favoriteArtists.add(track.author);
        });

        // Find tracks by those artists that the user hasn't played yet
        const recommendations: string[] = [];

        Object.entries(analytics.tracks.playCount).forEach(([trackId, stats]) => {
            if (recommendations.length >= limit) return;

            const track = this.getTrackData(guildId, trackId);
            if (!track) return;

            if (favoriteArtists.has(track.author) && !favorites.includes(trackId)) {
                recommendations.push(trackId);
            }
        });

        return recommendations;
    }

    /**
     * Get track metadata by its ID
     * @param guildId Guild ID
     * @param trackId Track ID
     * @private
     */
    private getTrackData(guildId: string, trackId: string): { title: string, author: string } | null {
        const analytics = this.data.get(guildId);
        if (!analytics) return null;

        // Look up track in recently played
        const recentTrack = analytics.tracks.recentlyPlayed.find(t => t.trackId === trackId);
        if (recentTrack) {
            return {
                title: recentTrack.title,
                author: recentTrack.author
            };
        }

        return null;
    }

    /**
     * Get summary statistics for a guild
     * @param guildId Guild ID
     */
    public getSummaryStats(guildId: string): {
        totalTracks: number,
        totalPlayTime: number,
        uniqueArtists: number,
        totalSessions: number,
        averageSessionDuration: number,
        mostPopularHour: number | null,
    } {
        const analytics = this.data.get(guildId);
        if (!analytics) {
            return {
                totalTracks: 0,
                totalPlayTime: 0,
                uniqueArtists: 0,
                totalSessions: 0,
                averageSessionDuration: 0,
                mostPopularHour: null,
            };
        }

        // Find most popular hour
        let mostPopularHour = null;
        let maxCount = 0;

        Object.entries(analytics.sessions.peakTimes).forEach(([hour, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostPopularHour = parseInt(hour);
            }
        });

        return {
            totalTracks: Object.keys(analytics.tracks.playCount).length,
            // Sum of all tracks' play time
            totalPlayTime: Object.values(analytics.tracks.playCount)
                .reduce((sum, stats) => sum + stats.totalPlayTime, 0),
            uniqueArtists: Object.keys(analytics.artists.playCount).length,
            totalSessions: this.getTotalSessionCount(guildId),
            averageSessionDuration: analytics.sessions.averageSessionDuration,
            mostPopularHour,
        };
    }

    /**
     * Get activity heatmap data (plays by hour and day)
     * @param guildId Guild ID
     */
    public getActivityHeatmap(guildId: string): { hourly: number[], daily: number[] } {
        const analytics = this.data.get(guildId);
        if (!analytics) {
            return {
                hourly: Array(24).fill(0),
                daily: Array(7).fill(0)
            };
        }

        // Convert to arrays
        const hourly = Array(24).fill(0);
        const daily = Array(7).fill(0);

        Object.entries(analytics.sessions.peakTimes).forEach(([hour, count]) => {
            const hourIdx = parseInt(hour);
            if (hourIdx >= 0 && hourIdx < 24) {
                hourly[hourIdx] = count;
            }
        });

        Object.entries(analytics.sessions.activityByDay).forEach(([day, count]) => {
            const dayIdx = parseInt(day);
            if (dayIdx >= 0 && dayIdx < 7) {
                daily[dayIdx] = count;
            }
        });

        return { hourly, daily };
    }

    /**
     * Export analytics data as JSON
     * @param guildId Guild ID
     */
    public exportData(guildId: string): string {
        const analytics = this.data.get(guildId);
        if (!analytics) return '{}';

        return JSON.stringify(analytics, null, 2);
    }

    /**
     * Export analytics as CSV
     * @param guildId Guild ID
     * @param dataType Type of data to export
     */
    public exportCsv(guildId: string, dataType: AnalyticsDataType): string {
        const analytics = this.data.get(guildId);
        if (!analytics) return '';

        let csvContent = '';

        switch (dataType) {
            case 'tracks':
                csvContent = 'Track ID,Play Count,Total Play Time,Avg Listening %,Skips\n';
                Object.entries(analytics.tracks.playCount).forEach(([trackId, stats]) => {
                    csvContent += `"${trackId}",${stats.count},${stats.totalPlayTime},${stats.averageListeningPercentage},${stats.skips}\n`;
                });
                break;

            case 'artists':
                csvContent = 'Artist,Play Count,Total Play Time\n';
                Object.entries(analytics.artists.playCount).forEach(([artist, count]) => {
                    const playTime = analytics.artists.playTime[artist] || 0;
                    csvContent += `"${artist}",${count},${playTime}\n`;
                });
                break;

            case 'users':
                if (!this.options.trackUsers) return '';

                csvContent = 'User ID,Request Count\n';
                Object.entries(analytics.users.requestCount).forEach(([userId, count]) => {
                    csvContent += `"${userId}",${count}\n`;
                });
                break;
        }

        return csvContent;
    }

    /**
     * Clean up old analytics data
     */
    public cleanupOldData(): void {
        const cutoffDate = Date.now() - (this.options.historyRetention * 24 * 60 * 60 * 1000);

        // Clean up recent tracks older than cutoff
        for (const [guildId, analytics] of this.data.entries()) {
            analytics.tracks.recentlyPlayed = analytics.tracks.recentlyPlayed
                .filter(track => track.playedAt >= cutoffDate);

            // Update last updated timestamp
            analytics.lastUpdated = Date.now();
        }
    }

    /**
     * Stop the analytics system and save data
     */
    public async shutdown(): Promise<void> {
        clearInterval(this.saveInterval);
        await this.saveData();
    }
}

/**
 * File storage implementation for analytics
 */
class FileAnalyticsStorage implements StorageStrategy {
    constructor(private basePath: string) {
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }
    }

    async save(key: string, data: any): Promise<void> {
        const filePath = this.getFilePath(key);

        // Create directories if needed
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    }

    async load(key: string): Promise<any> {
        const filePath = this.getFilePath(key);
        if (!fs.existsSync(filePath)) return null;

        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }

    async delete(key: string): Promise<void> {
        const filePath = this.getFilePath(key);
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    }

    async getAll(): Promise<string[]> {
        const results: string[] = [];

        await this.walkDirectory(this.basePath, '', (key) => {
            results.push(key);
        });

        return results;
    }

    private getFilePath(key: string): string {
        return path.join(this.basePath, `${key}.json`);
    }

    private async walkDirectory(dir: string, prefix: string, callback: (key: string) => void): Promise<void> {
        if (!fs.existsSync(dir)) return;

        const files = await fs.promises.readdir(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.promises.stat(filePath);

            if (stat.isDirectory()) {
                await this.walkDirectory(filePath, `${prefix}${file}/`, callback);
            } else if (file.endsWith('.json')) {
                callback(`${prefix}${file.replace('.json', '')}`);
            }
        }
    }
}
