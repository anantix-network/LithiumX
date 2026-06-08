/**
 * Example analytics commands for your Discord bot
 *
 * This file provides example functions to integrate with your existing Discord bot.
 * You'll need to adapt these to your specific command framework (Discord.js, Eris, etc.)
 */

import type { LithiumXManager } from '../Structures/Manager';
import { Visualization } from '../Structures/Visualization';

/**
 * Get statistics about top tracks
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @returns Formatted statistics message
 */
export function getTopTracksStats(manager: LithiumXManager, guildId: string): string {
	const analytics = manager.analytics;
	const topTracks = analytics.getMostPlayedTracks(guildId, 10);

	if (topTracks.length === 0) {
		return 'No track statistics available yet.';
	}

	// Format the data for visualization
	const guildData = analytics.getAnalytics(guildId);
	const formattedData = topTracks.map(({ trackId, count }) => {
		// Find track details in recently played
		let label = trackId;
		if (guildData) {
			const track = guildData.tracks.recentlyPlayed.find((t) => t.trackId === trackId);
			if (track) {
				label = `${track.author} - ${track.title}`;
			}
		}

		return { label: label.slice(0, 30), value: count };
	});

	// Create a horizontal bar chart
	const chart = Visualization.horizontalBarChart(formattedData);

	return '**Top Played Tracks**\n```\n' + chart + '\n```';
}

/**
 * Get statistics about top artists
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @returns Formatted statistics message
 */
export function getTopArtistsStats(manager: LithiumXManager, guildId: string): string {
	const artists = manager.analytics.getTopArtists(guildId, 10);

	if (artists.length === 0) {
		return 'No artist statistics available yet.';
	}

	// Format the data for visualization
	const formattedData = artists.map(({ artist, count }) => {
		return { label: artist.slice(0, 30), value: count };
	});

	// Create a horizontal bar chart
	const chart = Visualization.horizontalBarChart(formattedData);

	return '**Top Artists**\n```\n' + chart + '\n```';
}

/**
 * Get activity heatmap visualization
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @returns Formatted heatmap message
 */
export function getActivityHeatmap(manager: LithiumXManager, guildId: string): string {
	const { hourly, daily } = manager.analytics.getActivityHeatmap(guildId);

	// Create an hourly heatmap
	const heatmap = Visualization.hourlyHeatmap(hourly);

	// Create a weekly activity chart
	const weeklyChart = Visualization.weeklyActivity(daily);

	return '**Music Activity Heatmap**\n' + '```\n' + heatmap + '\n```\n' + '**Weekly Activity**\n' + '```\n' + weeklyChart + '\n```';
}

/**
 * Get user recommendations based on listening history
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @param userId User ID
 * @returns Formatted recommendations message
 */
export function getUserRecommendations(manager: LithiumXManager, guildId: string, userId: string): string {
	const recommendations = manager.analytics.getUserRecommendations(guildId, userId, 5);

	if (recommendations.length === 0) {
		return 'Not enough listening history to generate recommendations.';
	}

	// Find track details
	const guildData = manager.analytics.getAnalytics(guildId);
	const tracks = recommendations.map((trackId) => {
		if (guildData) {
			const track = guildData.tracks.recentlyPlayed.find((t) => t.trackId === trackId);
			if (track) {
				return `• ${track.author} - ${track.title}`;
			}
		}
		return `• Unknown Track (${trackId})`;
	});

	return '**Recommended for You**\nBased on your listening history:\n' + tracks.join('\n');
}

/**
 * Get server music summary
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @returns Formatted summary message
 */
export function getServerMusicSummary(manager: LithiumXManager, guildId: string): string {
	const stats = manager.analytics.getSummaryStats(guildId);

	if (stats.totalTracks === 0) {
		return 'No music playback statistics available yet.';
	}

	const totalHours = (stats.totalPlayTime / 1000 / 60 / 60).toFixed(1);
	const avgSessionMinutes = (stats.averageSessionDuration / 1000 / 60).toFixed(1);

	let peakTime = 'N/A';
	if (stats.mostPopularHour !== null) {
		const hour = stats.mostPopularHour;
		peakTime = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
	}

	return (
		'**Server Music Summary**\n' +
		`• Total unique tracks played: ${stats.totalTracks}\n` +
		`• Total listening time: ${totalHours} hours\n` +
		`• Unique artists played: ${stats.uniqueArtists}\n` +
		`• Average listening session: ${avgSessionMinutes} minutes\n` +
		`• Peak music time: ${peakTime}`
	);
}

/**
 * Export server analytics as CSV
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @param dataType Type of data to export
 * @returns CSV data as string
 */
export function exportAnalytics(manager: LithiumXManager, guildId: string, dataType: 'tracks' | 'artists' | 'users'): string {
	return manager.analytics.exportCsv(guildId, dataType);
}

/**
 * Generate a full analytics report
 * @param manager LithiumX manager
 * @param guildId Guild ID
 * @returns Formatted report
 */
export function generateFullReport(manager: LithiumXManager, guildId: string): string {
	const analytics = manager.analytics.getAnalytics(guildId);

	if (!analytics) {
		return 'No analytics data available for this server.';
	}

	return Visualization.generateReport(analytics);
}
