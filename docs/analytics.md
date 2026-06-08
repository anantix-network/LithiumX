# Analytics

LithiumX includes a built-in analytics system that tracks music usage patterns across your guilds. It can be used to power recommendation features, generate statistics, and understand listening habits.

## Enabling Analytics

```typescript
import { Analytics } from 'lithiumx';

const analytics = new Analytics(manager, {
    trackUsers: true,
    saveInterval: 300000,  // save every 5 minutes (default)
    historyRetention: 30,  // keep 30 days of history (default)
});
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable or disable analytics |
| `storage` | `StorageStrategy` | `MemoryStorage` | Persistence backend |
| `saveInterval` | `number` | `300000` | How often to save data (ms) |
| `historyRetention` | `number` | `30` | Days to keep history |
| `trackUsers` | `boolean` | `true` | Track per-user activity |
| `anonymizeUsers` | `boolean` | `false` | Hash user IDs for privacy |

## Data Collected

### Tracks
- Play count per track
- Total play time per track
- Average listening percentage
- Skip frequency
- Recently played tracks (last 50)

### Artists
- Play count per artist
- Total play time per artist

### Users
- Request count per user
- Favorite tracks (up to 20 per user)

### Sessions
- Total listening time
- Average session duration
- Peak listening hours
- Activity by day of week

## API

### getAnalytics(guildId)

Get all analytics data for a guild.

```typescript
const data = analytics.getAnalytics('123456789');
console.log(data.tracks.playCount);
```

### getMostPlayedTracks(guildId, limit?)

Get the most played tracks in a guild.

```typescript
const topTracks = analytics.getMostPlayedTracks('123456789', 10);
```

### getTopArtists(guildId, limit?)

Get the most popular artists in a guild.

```typescript
const topArtists = analytics.getTopArtists('123456789', 10);
```

### getActiveUsers(guildId, limit?)

Get the most active users in a guild.

```typescript
const activeUsers = analytics.getActiveUsers('123456789', 10);
```

### getUserRecommendations(guildId, userId, limit?)

Get personalized track recommendations based on a user's listening history.

```typescript
const recs = analytics.getUserRecommendations('123456789', 'user_id', 5);
```

### getSummaryStats(guildId)

Get a summary of analytics for a guild.

```typescript
const summary = analytics.getSummaryStats('123456789');
// { totalTracks, totalPlayTime, uniqueArtists, totalSessions, averageSessionDuration, mostPopularHour }
```

### getActivityHeatmap(guildId)

Get activity data broken down by hour and day of week.

```typescript
const heatmap = analytics.getActivityHeatmap('123456789');
// { hourly: number[24], daily: number[7] }
```

### exportData(guildId)

Export analytics as JSON.

```typescript
const json = analytics.exportData('123456789');
```

### exportCsv(guildId, dataType)

Export analytics as CSV for spreadsheet tools.

```typescript
const csv = analytics.exportCsv('123456789', 'tracks');
// dataType: 'tracks' | 'artists' | 'users'
```

### cleanupOldData()

Remove data older than the configured retention period.

```typescript
analytics.cleanupOldData();
```

### shutdown()

Stop the analytics system and persist data.

```typescript
await analytics.shutdown();
```

## Persistence

By default, analytics uses in-memory storage. For persistent storage across restarts, pass a `RedisStorage`:

```typescript
import { Analytics, RedisStorage } from 'lithiumx';

const analytics = new Analytics(manager, {
    storage: new RedisStorage('redis://localhost:6379', 'lithium:analytics:'),
});
```
