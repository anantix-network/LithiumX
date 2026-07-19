import { bench, describe, vi, beforeEach } from 'vitest';
import { Filters, FilterPresets } from '../../src/Structures/Filters';
import { createTestManager, createMockPlayerForFilters } from '../helpers';
import type { LithiumXManager } from '../../src/Structures/Manager';

const LAVALINK_RESPONSE = {
  loadType: 'search',
  data: [
    {
      encoded: 'base64track==',
      info: {
        title: 'Bench Track',
        identifier: 'bench123',
        author: 'Bench Artist',
        length: 240000,
        isSeekable: true,
        isStream: false,
        uri: 'https://www.youtube.com/watch?v=bench123',
        sourceName: 'youtube',
        isrc: null,
        artworkUrl: null,
      },
      pluginInfo: {},
    },
  ],
};

describe('Filter apply latency', () => {
  bench('setHighSpeed() with defaults', () => {
    const player = createMockPlayerForFilters();
    const filters = new Filters(player);
    filters.setHighSpeed();
  });

  bench('setNightcore() for comparison', () => {
    const player = createMockPlayerForFilters();
    const filters = new Filters(player);
    filters.setNightcore(true);
  });

  bench('setHighSpeed() with custom opts', () => {
    const player = createMockPlayerForFilters();
    const filters = new Filters(player);
    filters.setHighSpeed({ speed: 2.0, pitch: 1.1, rate: 0.9 });
  });
});

describe('Search cache hit latency', () => {
  let manager: LithiumXManager;

  beforeEach(async () => {
    // Each bench gets its own manager. Cache is pre-warmed for the
    // 'cache hit' bench so subsequent iterations within that bench hit cache.
    manager = createTestManager();
    const node = manager.nodes.first()!;
    vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);
    // Pre-warm the cache so 'cache hit' bench measures warm cache latency
    await manager.search('warm-up query');
  });

  bench('cache hit (warmed cache)', async () => {
    await manager.search('warm-up query');
  });

  bench('cache miss (unique query per iteration)', async () => {
    await manager.search(`unique-${Math.random()}`);
  });
});
