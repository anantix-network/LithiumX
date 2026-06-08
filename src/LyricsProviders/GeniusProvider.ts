import type { LyricsData, LyricsOptions, LyricsProvider } from '../Structures/Lyrics';
import type { Track, UnresolvedTrack } from '../Structures/Player';

export class GeniusProvider implements LyricsProvider {
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

			// Extract lyrics using regex
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
