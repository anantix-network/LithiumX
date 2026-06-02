import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestManager } from '../helpers';
import type { LithiumXManager } from '../../src/Structures/Manager';

const LAVALINK_RESPONSE = {
  loadType: 'search',
  data: [
    {
      encoded: 'base64track==',
      info: {
        title: 'Test Track',
        identifier: 'abc123',
        author: 'Test Artist',
        length: 240000,
        isSeekable: true,
        isStream: false,
        uri: 'https://www.youtube.com/watch?v=abc123',
        sourceName: 'youtube',
        isrc: null,
        artworkUrl: null,
      },
      pluginInfo: {},
    },
  ],
};

describe('Manager search cache TTL', () => {
  let manager: LithiumXManager;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = createTestManager();
    // Mock the first node's rest.get for search calls
    const node = manager.nodes.first()!;
    vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns cached result on second call within TTL', async () => {
    const node = manager.nodes.first()!;
    const getSpy = vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);

    await manager.search('lofi beats');
    await manager.search('lofi beats');

    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('re-fetches after TTL (60s) expires', async () => {
    const node = manager.nodes.first()!;
    const getSpy = vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);

    await manager.search('lofi beats');
    vi.advanceTimersByTime(60_001);
    await manager.search('lofi beats');

    expect(getSpy).toHaveBeenCalledTimes(2);
  });

  it('clearSearchCache() forces re-fetch', async () => {
    const node = manager.nodes.first()!;
    const getSpy = vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);

    await manager.search('lofi beats');
    manager.clearSearchCache();
    await manager.search('lofi beats');

    expect(getSpy).toHaveBeenCalledTimes(2);
  });

  it('different queries have independent TTLs', async () => {
    const node = manager.nodes.first()!;
    const getSpy = vi.spyOn(node.rest, 'get').mockResolvedValue(LAVALINK_RESPONSE);

    await manager.search('query one');
    vi.advanceTimersByTime(30_000);
    await manager.search('query two');
    await manager.search('query one'); // still within TTL
    await manager.search('query two'); // still within TTL

    expect(getSpy).toHaveBeenCalledTimes(2); // only 2 fetches (one per unique query)
  });
});
