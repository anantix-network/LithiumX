import type { LithiumXManager } from './Manager';
import type { Track, UnresolvedTrack } from './Player';

/**
 * Interface representing lyrics data
 */
export interface LyricsData {
	/** The lyrics text */
	lyrics: string;
	/** The source of the lyrics */
	source: string;
	/** Whether lyrics are synchronized with timestamps */
	synced: boolean;
	/** Title of the track */
	title?: string;
	/** Artist of the track */
	artist?: string;
	/** Thumbnail URL if available */
	thumbnail?: string;
	/** URL to the lyrics page */
	url?: string;
}

/**
 * Interface for lyrics providers
 */
export interface LyricsProvider {
	/**
	 * Name of the provider
	 */
	name: string;

	/**
	 * Fetch lyrics for a track
	 * @param track The track to get lyrics for
	 * @param options Optional search options
	 */
	fetch(track: Track | UnresolvedTrack, options?: LyricsOptions): Promise<LyricsData | null>;
}

/**
 * Options for lyrics fetching
 */
export interface LyricsOptions {
	/** Whether to prefer synced lyrics when available */
	preferSynced?: boolean;
	/** Specific artist name to use in search */
	artist?: string;
	/** Specific title to use in search */
	title?: string;
	/** Maximum time to wait for lyrics in ms */
	timeout?: number;
}

/**
 * The main lyrics manager class
 */
export class LyricsManager {
	/** Available lyrics providers */
	private providers: Map<string, LyricsProvider> = new Map();
	/** Lyrics cache for performance */
	private cache: Map<string, LyricsData> = new Map();
	/** Cache duration in ms */
	private cacheDuration: number;
	/** Max number of entries in the lyrics cache */
	private maxCacheSize: number;
	/** Reference to the LithiumX manager */
	private manager: LithiumXManager;
	/** Periodic cache cleanup timer */
	private cleanupTimer: NodeJS.Timeout | undefined;

	/**
	 * Create a new lyrics manager
	 * @param manager The LithiumX manager
	 * @param options Configuration options
	 */
	constructor(manager: LithiumXManager, options: LyricsManagerOptions = {}) {
		this.manager = manager;
		this.cacheDuration = options.cacheDuration || 3600000; // Default: 1 hour
		this.maxCacheSize = options.maxCacheSize ?? 200;

		// Register default providers
		this.registerProvider(new DefaultLyricsProvider());

		if (options.providers) {
			options.providers.forEach((provider) => {
				this.registerProvider(provider);
			});
		}

		// Register Genius if API key is provided
		if (options.geniusApiKey) {
			this.registerProvider(new GeniusLyricsProvider(options.geniusApiKey));
		}

		// Clean cache periodically
		if (this.cacheDuration > 0) {
			this.cleanupTimer = setInterval(() => this.cleanCache(), this.cacheDuration);
		}
	}

	/**
	 * Register a lyrics provider
	 * @param provider The provider to register
	 */
	public registerProvider(provider: LyricsProvider): void {
		this.providers.set(provider.name.toLowerCase(), provider);
	}

	/**
	 * Remove a lyrics provider
	 * @param name The name of the provider to remove
	 */
	public unregisterProvider(name: string): boolean {
		return this.providers.delete(name.toLowerCase());
	}

	/**
	 * Get all available providers
	 */
	public getProviders(): string[] {
		return Array.from(this.providers.keys());
	}

	/**
	 * Search for lyrics using all registered providers
	 * @param track The track to get lyrics for
	 * @param options Search options
	 */
	public async search(track: Track | UnresolvedTrack, options: LyricsOptions = {}): Promise<LyricsData | null> {
		// Generate cache key
		const cacheKey = `${track.author || ''}_${track.title}`;

		// Check cache first
		const cached = this.cache.get(cacheKey);
		if (cached) return cached;

		// Try providers in sequence until one returns lyrics
		for (const provider of this.providers.values()) {
			try {
				const lyrics = await provider.fetch(track, options);
				if (lyrics?.lyrics) {
					this.evictIfNeeded();
					this.cache.set(cacheKey, lyrics);
					return lyrics;
				}
			} catch (error) {
				console.error(`Error fetching lyrics from ${provider.name}:`, error);
			}
		}

		return null;
	}

	/**
	 * Search for lyrics using a specific provider
	 * @param providerName The provider to use
	 * @param track The track to get lyrics for
	 * @param options Search options
	 */
	public async searchWithProvider(providerName: string, track: Track | UnresolvedTrack, options: LyricsOptions = {}): Promise<LyricsData | null> {
		const provider = this.providers.get(providerName.toLowerCase());
		if (!provider) {
			throw new Error(`Lyrics provider "${providerName}" not found`);
		}

		const author = track.author || '';
		const cacheKey = `${providerName}:${author}_${track.title}`;
		const cached = this.cache.get(cacheKey);
		if (cached) return cached;

		try {
			const lyrics = await provider.fetch(track, options);
			if (lyrics?.lyrics) {
				this.evictIfNeeded();
				this.cache.set(cacheKey, lyrics);
				return lyrics;
			}
		} catch (error) {
			console.error(`Error fetching lyrics from ${provider.name}:`, error);
		}

		return null;
	}

	/**
	 * Clear the lyrics cache
	 */
	public clearCache(): void {
		this.cache.clear();
	}

	/**
	 * Remove expired cache entries
	 */
	private cleanCache(): void {
		this.cache.clear();
	}

	/**
	 * Evict oldest entry when cache exceeds max size
	 */
	private evictIfNeeded(): void {
		if (this.cache.size >= this.maxCacheSize) {
			const oldestKey = this.cache.keys().next();
			if (!oldestKey.done && oldestKey.value !== undefined) {
				this.cache.delete(oldestKey.value);
			}
		}
	}
}

/**
 * Options for the lyrics manager
 */
export interface LyricsManagerOptions {
	/** How long to cache lyrics (in milliseconds) */
	cacheDuration?: number;
	/** Max number of entries in the lyrics cache. Default: 200 */
	maxCacheSize?: number;
	/** Genius API key for using the Genius lyrics provider */
	geniusApiKey?: string;
	/** Additional lyrics providers to register */
	providers?: LyricsProvider[];
}

/**
 * Default lyrics provider that uses simple search
 */
class DefaultLyricsProvider implements LyricsProvider {
	name = 'default';

	async fetch(track: Track | UnresolvedTrack, options: LyricsOptions = {}): Promise<LyricsData | null> {
		const title = options.title || track.title;
		const artist = options.artist || track.author || '';
		const _query = encodeURIComponent(`${artist} ${title} lyrics`);

		try {
			// Using a simple fetch with timeout handling
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);

			const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`, {
				signal: controller.signal,
			});
			clearTimeout(timeoutId);

			if (!response.ok) return null;

			const data = (await response.json()) as { lyrics?: string };

			if (!data?.lyrics) return null;

			return {
				lyrics: data.lyrics,
				source: 'LyricsOVH',
				synced: false,
				title: title,
				artist: artist,
			};
		} catch (error: unknown) {
			// Don't log AbortError which is expected when timeout happens
			if (!(error instanceof Error) || error.name !== 'AbortError') {
				console.error('Error fetching lyrics:', error);
			}
			return null;
		}
	}
}

/**
 * Genius Lyrics provider that uses the Genius API
 */
class GeniusLyricsProvider implements LyricsProvider {
	name = 'genius';
	private apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async fetch(track: Track | UnresolvedTrack, options: LyricsOptions = {}): Promise<LyricsData | null> {
		const title = options.title || track.title;
		const artist = options.artist || track.author || '';
		const query = encodeURIComponent(`${artist} ${title}`);

		try {
			// Setup timeout handling
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);

			// Search for the song on Genius
			const searchResponse = await fetch(`https://api.genius.com/search?q=${query}`, {
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
				},
				signal: controller.signal,
			});

			if (!searchResponse.ok) {
				clearTimeout(timeoutId);
				return null;
			}

			const searchData = (await searchResponse.json()) as {
				response?: {
					hits?: Array<{
						result?: {
							title: string;
							url: string;
							primary_artist?: { name: string };
							song_art_image_url?: string;
						};
					}>;
				};
			};

			// Check if we found any matches
			if (!searchData?.response?.hits?.length) {
				clearTimeout(timeoutId);
				return null;
			}

			// Get the first hit
			const firstHit = searchData.response.hits[0];
			if (!firstHit) {
				clearTimeout(timeoutId);
				return null;
			}
			const hit = firstHit.result;
			if (!hit) {
				clearTimeout(timeoutId);
				return null;
			}

			const songUrl = hit.url;

			// Fetch the webpage to extract lyrics
			const pageResponse = await fetch(songUrl, { signal: controller.signal });
			const html = await pageResponse.text();
			clearTimeout(timeoutId);

			// Extract lyrics using regex (no dependencies)
			const lyrics = this.extractLyrics(html);

			if (!lyrics) return null;

			const thumbnail = hit.song_art_image_url;
			return {
				lyrics: lyrics.trim(),
				source: 'Genius',
				synced: false,
				title: hit.title,
				artist: hit.primary_artist?.name || artist,
				...(thumbnail !== undefined ? { thumbnail } : {}),
				url: songUrl,
			};
		} catch (error: unknown) {
			// Don't log AbortError which is expected when timeout happens
			if (!(error instanceof Error) || error.name !== 'AbortError') {
				console.error('Error fetching lyrics from Genius:', error);
			}
			return null;
		}
	}

	/**
	 * Extract lyrics from HTML content without using external libraries
	 */
	private extractLyrics(html: string): string {
		// First try to extract from modern Genius pages
		const lyricsContainerRegex = /<div[^>]*class="?[^"]*Lyrics__Container[^"]*"?[^>]*>([\s\S]*?)<\/div>/gi;
		const containers = html.match(lyricsContainerRegex);

		if (containers?.length) {
			return containers
				.map((container) => {
					// Replace <br> with newlines and remove other HTML tags
					return container
						.replace(/<br\s*\/?>/gi, '\n')
						.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '')
						.replace(/&nbsp;/g, ' ')
						.replace(/&amp;/g, '&')
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&quot;/g, '"')
						.replace(/&#39;/g, "'")
						.replace(/\n{3,}/g, '\n\n');
				})
				.join('\n\n')
				.trim();
		}

		// Legacy Genius pages fallback
		const lyricsRegex = /<div\s+class="lyrics"[^>]*>([\s\S]*?)<\/div>/i;
		const match = html.match(lyricsRegex);

		if (match?.[1]) {
			return match[1]
				.replace(/<br\s*\/?>/gi, '\n')
				.replace(/<[^>]+>/g, '')
				.replace(/&nbsp;/g, ' ')
				.replace(/&amp;/g, '&')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.trim();
		}

		return '';
	}
}

export { DefaultLyricsProvider, GeniusLyricsProvider };
