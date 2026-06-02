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
    manager = createTestManager();
    const node = manager.nodes.first()!;
    vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);
    // Pre-warm the cache
    await manager.search('warm-up query');
  });

  bench('cache hit (same query)', async () => {
    await manager.search('warm-up query');
  });

  bench('cache miss (unique query)', async () => {
    await manager.search(`unique-${Math.random()}`);
  });
});
