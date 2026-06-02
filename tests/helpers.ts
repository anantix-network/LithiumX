import { vi } from 'vitest';
import { LithiumXManager } from '../src/Structures/Manager';
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

/**
 * Creates a LithiumXManager with two mock nodes (node-1, node-2) for testing.
 * Both nodes are mocked as connected with no real WebSocket.
 * extraOptions can override any ManagerOptions property — note that overriding
 * `nodes` or `caches` replaces the entire default structure.
 */
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
