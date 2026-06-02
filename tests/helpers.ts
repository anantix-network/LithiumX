import { vi } from 'vitest';
import { LithiumXManager } from '../src/Structures/Manager';
import { Filters } from '../src/Structures/Filters';
import type { LithiumXPlayer } from '../src/Structures/Player';

export function createMockPlayerForFilters() {
  return {
    guild: '123456789012345678',
    node: {
      rest: {
        updatePlayer: vi.fn().mockResolvedValue(undefined),
      },
    },
  } as unknown as LithiumXPlayer;
}

export function createTestManager(extraOptions: Record<string, unknown> = {}) {
  const manager = new LithiumXManager({
    nodes: [
      { host: 'localhost', port: 2333, identifier: 'node-1' },
      { host: 'localhost', port: 2334, identifier: 'node-2' },
    ],
    send: vi.fn(),
    caches: { enabled: true, time: 60_000 },
    ...extraOptions,
  });

  // Mock both nodes as connected (no real WebSocket needed)
  for (const node of manager.nodes.values()) {
    vi.spyOn(node, 'connected', 'get').mockReturnValue(true);
    vi.spyOn(node.rest, 'get').mockResolvedValue({ version: { semver: '4.0.0' } });
  }

  return manager;
}
