import type { AnalyticsData } from './Analytics';

/**
 * Generate ASCII charts for analytics data
 */
export class Visualization {
	/**
	 * Generate a horizontal bar chart
	 * @param data Array of data points with labels
	 * @param width Maximum width of the chart
	 */
	static horizontalBarChart(data: Array<{ label: string; value: number }>, width = 40): string {
		if (data.length === 0) return 'No data available';

		// Find maximum value to normalize the bars
		const max = Math.max(...data.map((d) => d.value));
		if (max === 0) return 'No data available';

		const maxLabelLength = Math.max(...data.map((d) => d.label.length));

		// Generate chart
		let chart = '';
		data.forEach((item) => {
			const barLength = Math.max(1, Math.round((item.value / max) * width));
			const bar = '█'.repeat(barLength);
			chart += `${item.label.padEnd(maxLabelLength)} │ ${bar} ${item.value}\n`;
		});

		return chart;
	}

	/**
	 * Generate a heatmap representation of hourly activity
	 * @param hourlyData Array of 24 values representing hourly activity
	 */
	static hourlyHeatmap(hourlyData: number[]): string {
		if (hourlyData.length !== 24) {
			return 'Invalid data: expected 24 hours';
		}

		const max = Math.max(...hourlyData);
		if (max === 0) return 'No activity data available';

		// Define intensity characters from low to high
		const intensityChars = ' ░▒▓█';

		let heatmap = '    00-03 04-07 08-11 12-15 16-19 20-23\n';
		heatmap += '    -------------------------------\n';

		// Generate the heatmap
		for (let row = 0; row < 4; row++) {
			heatmap += `${row * 6}h |`;

			for (let col = 0; col < 6; col++) {
				const hour = row + col * 4;
				const value = hourlyData[hour] ?? 0;
				const intensity = Math.floor((value / max) * (intensityChars.length - 1));
				const char = intensityChars[intensity] || ' ';

				heatmap += ` ${char}${char}${char}${char} `;
			}

			heatmap += '|\n';
		}

		return heatmap;
	}

	/**
	 * Generate a weekly activity view
	 * @param dailyData Array of 7 values representing daily activity
	 */
	static weeklyActivity(dailyData: number[]): string {
		if (dailyData.length !== 7) {
			return 'Invalid data: expected 7 days';
		}

		const max = Math.max(...dailyData);
		if (max === 0) return 'No activity data available';

		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const height = 10;

		let chart = '';

		// Generate y-axis labels and bars
		for (let i = height; i > 0; i--) {
			const row = dailyData
				.map((value) => {
					const normalizedHeight = Math.ceil((value / max) * height);
					return normalizedHeight >= i ? '█' : ' ';
				})
				.join('  ');

			chart += `${row}\n`;
		}

		// Add x-axis labels
		chart += days.join(' ');

		return chart;
	}

	/**
	 * Generate a simple progress bar
	 * @param value Current value
	 * @param max Maximum value
	 * @param length Length of the progress bar
	 */
	static progressBar(value: number, max: number, length = 20): string {
		const percentage = Math.min(100, Math.round((value / max) * 100));
		const filledLength = Math.round((value / max) * length);
		const filled = '█'.repeat(filledLength);
		const empty = '░'.repeat(Math.max(0, length - filledLength));

		return `${filled}${empty} ${percentage}%`;
	}

	/**
	 * Generate a report from analytics data
	 * @param analytics Analytics data for a guild
	 */
	static generateReport(analytics: AnalyticsData): string {
		if (!analytics) return 'No analytics data available';

		let report = '=== Music Bot Analytics Report ===\n\n';

		// Summary section
		report += '== Summary ==\n';
		const totalTracks = Object.keys(analytics.tracks.playCount).length;
		const totalPlayTime = Object.values(analytics.tracks.playCount).reduce((sum, stats) => sum + stats.totalPlayTime, 0);
		const totalPlayTimeHours = (totalPlayTime / 1000 / 60 / 60).toFixed(1);

		report += `Total unique tracks played: ${totalTracks}\n`;
		report += `Total music played: ${totalPlayTimeHours} hours\n`;
		report += `Unique artists played: ${Object.keys(analytics.artists.playCount).length}\n\n`;

		// Top tracks
		report += '== Top Tracks ==\n';
		const topTracks = Object.entries(analytics.tracks.playCount)
			.sort((a, b) => b[1].count - a[1].count)
			.slice(0, 5);

		if (topTracks.length > 0) {
			topTracks.forEach(([trackId, stats], index) => {
				const track = analytics.tracks.recentlyPlayed.find((t) => t.trackId === trackId);
				const name = track ? `${track.author} - ${track.title}` : trackId;
				report += `${index + 1}. ${name} (${stats.count} plays)\n`;
			});
		} else {
			report += 'No track data available\n';
		}
		report += '\n';

		// Top artists
		report += '== Top Artists ==\n';
		const topArtists = Object.entries(analytics.artists.playCount)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		if (topArtists.length > 0) {
			topArtists.forEach(([artist, count], index) => {
				report += `${index + 1}. ${artist} (${count} plays)\n`;
			});
		} else {
			report += 'No artist data available\n';
		}
		report += '\n';

		// Activity patterns
		report += '== Activity Patterns ==\n';

		// Find peak hour
		let peakHour = 0;
		let peakCount = 0;
		Object.entries(analytics.sessions.peakTimes).forEach(([hour, count]) => {
			if (count > peakCount) {
				peakHour = parseInt(hour, 10);
				peakCount = count;
			}
		});

		report += `Peak activity time: ${peakHour.toString().padStart(2, '0')}:00 hours\n\n`;

		// Generate timestamp
		report += `Report generated on ${new Date().toISOString()}\n`;

		return report;
	}
}
