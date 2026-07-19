/**
 * Integration example: LithiumX high-speed features
 *
 * Demonstrates setHighSpeed(), per-entry TTL cache, heartbeat, prefetch.
 * Requires a running Lavalink server and Discord bot token to execute fully.
 * Run: bun tests/integration/example-bot.ts
 */
import { LithiumXManager } from '../../src/Structures/Manager';
import { FilterPresets } from '../../src/Structures/Filters';

// ------------------------------------------------------------------
// Manager setup with all high-speed options enabled
// ------------------------------------------------------------------
const manager = new LithiumXManager({
  nodes: [
    {
      host: process.env.LAVALINK_HOST ?? 'localhost',
      port: Number(process.env.LAVALINK_PORT ?? 2333),
      password: process.env.LAVALINK_PASSWORD ?? 'youshallnotpass',
      identifier: 'main',
      heartbeatInterval: 15_000,
      heartbeatTimeout: 3_000,
    },
  ],
  send: (_id, payload) => {
    console.log('[SEND]', JSON.stringify(payload));
  },
  caches: {
    enabled: true,
    time: 120_000,
  },
  prefetch: true,
  autoPlay: true,
});

// ------------------------------------------------------------------
// Event listeners
// ------------------------------------------------------------------
manager.on('NodeConnect', (node) => {
  console.log(`[NODE] Connected: ${node.options.identifier}`);
});

manager.on('NodeHealthCheck', (node, { latency, healthy }) => {
  if (healthy) {
    console.log(`[HEALTH] ${node.options.identifier} — ${latency}ms`);
  } else {
    console.warn(`[HEALTH] ${node.options.identifier} — UNHEALTHY, triggering reconnect`);
  }
});

manager.on('PlayerMigrated', (player, fromNode, toNode) => {
  console.log(
    `[MIGRATE] Guild ${player.guild}: ${fromNode.options.identifier} → ${toNode.options.identifier}`
  );
});

manager.on('TrackStart', (player, track) => {
  console.log(`[PLAY] ${track.title} — ${track.author}`);
  player.filters.setHighSpeed({ speed: 1.5 });
  console.log('[FILTER] High-speed 1.5x applied');
});

manager.on('TrackEnd', (player) => {
  console.log(`[QUEUE] Remaining: ${player.queue.length} tracks`);
});

// ------------------------------------------------------------------
// Demo: init + search (cache TTL demo)
// ------------------------------------------------------------------
async function demo() {
  manager.init('000000000000000001');

  await new Promise<void>((resolve) => manager.once('NodeConnect', () => resolve()));

  const guildId = '999999999999999999';
  const voiceChannelId = '888888888888888888';

  const player = manager.create({
    guild: guildId,
    voiceChannel: voiceChannelId,
  });
  player.connect();

  console.log('[SEARCH] First call (cache miss)...');
  const result1 = await manager.search('lofi hip hop beats');
  console.log(`[SEARCH] Found ${result1.tracks.length} tracks`);

  console.log('[SEARCH] Second call (should be cache hit)...');
  const result2 = await manager.search('lofi hip hop beats');
  console.log(`[SEARCH] Same result object: ${result1 === result2}`);

  if (result1.tracks.length > 0) {
    player.queue.add(result1.tracks.slice(0, 3));
    await player.play();
  }

  console.log('[PRESET]', JSON.stringify(FilterPresets.highSpeed(2.0)));

  manager.clearSearchCache();
  console.log('[CACHE] Cleared all search cache entries');
}

demo().catch(console.error);
