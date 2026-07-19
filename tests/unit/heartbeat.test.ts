import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestManager } from '../helpers';
import type { LithiumXManager } from '../../src/Structures/Manager';
import type { LithiumXNode } from '../../src/Structures/Node';

describe('Node heartbeat', () => {
  let manager: LithiumXManager;
  let node: LithiumXNode;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = createTestManager();
    node = manager.nodes.first()!;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits NodeHealthCheck with healthy: true on successful ping', async () => {
    vi.spyOn(node.rest, 'get').mockResolvedValue({ version: '4.0.0' });
    const emitSpy = vi.spyOn(manager, 'emit');

    // Set heartbeat options on the node
    node.options.heartbeatInterval = 5_000;
    node.options.heartbeatTimeout = 2_000;

    // Trigger open() to start heartbeat
    (node as any).open();

    // Advance past heartbeat interval to trigger the ping
    await vi.advanceTimersByTimeAsync(5_100);

    expect(emitSpy).toHaveBeenCalledWith(
      'NodeHealthCheck',
      node,
      expect.objectContaining({ healthy: true })
    );
  });

  it('emits NodeHealthCheck with healthy: false when ping times out', async () => {
    // Mock get to hang forever (never resolves)
    vi.spyOn(node.rest, 'get').mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    const emitSpy = vi.spyOn(manager, 'emit');

    node.options.heartbeatInterval = 5_000;
    node.options.heartbeatTimeout = 1_000;

    (node as any).open();

    // Advance past interval + timeout
    await vi.advanceTimersByTimeAsync(7_000);

    expect(emitSpy).toHaveBeenCalledWith(
      'NodeHealthCheck',
      node,
      expect.objectContaining({ healthy: false })
    );
  });

  it('stops heartbeat on close()', async () => {
    vi.spyOn(node.rest, 'get').mockResolvedValue({ version: '4.0.0' });
    const emitSpy = vi.spyOn(manager, 'emit');

    node.options.heartbeatInterval = 5_000;
    node.options.heartbeatTimeout = 2_000;

    (node as any).open();
    // Immediately close — heartbeat should be cleared
    (node as any).close(1000, 'destroy');

    // Advance past interval — NodeHealthCheck should NOT fire
    await vi.advanceTimersByTimeAsync(10_000);

    expect(emitSpy).not.toHaveBeenCalledWith('NodeHealthCheck', expect.anything(), expect.anything());
  });
});
