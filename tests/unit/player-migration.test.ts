import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestManager } from '../helpers';
import type { LithiumXManager } from '../../src/Structures/Manager';

describe('Player migration on NodeDisconnect', () => {
  let manager: LithiumXManager;

  beforeEach(() => {
    manager = createTestManager();
  });

  it('calls moveNode() on all players attached to the disconnecting node', () => {
    const node1 = manager.nodes.get('node-1')!;
    const node2 = manager.nodes.get('node-2')!;

    // Create two players on node-1
    const player1 = manager.create({
      guild: '111111111111111111',
      voiceChannel: '222222222222222222',
      node: 'node-1',
    });
    const player2 = manager.create({
      guild: '111111111111111112',
      voiceChannel: '222222222222222222',
      node: 'node-1',
    });

    // Update node stats so useableNodes picks node-2
    node1.stats.players = 2;
    node2.stats.players = 0;

    const moveNodeSpy1 = vi.spyOn(player1, 'moveNode').mockResolvedValue(player1 as any);
    const moveNodeSpy2 = vi.spyOn(player2, 'moveNode').mockResolvedValue(player2 as any);

    // Simulate node-1 disconnect
    manager.emit('NodeDisconnect', node1, { code: 1006, reason: 'abnormal closure' });

    expect(moveNodeSpy1).toHaveBeenCalledWith('node-2');
    expect(moveNodeSpy2).toHaveBeenCalledWith('node-2');
  });

  it('emits PlayerMigrated event with correct arguments', async () => {
    const node1 = manager.nodes.get('node-1')!;
    const node2 = manager.nodes.get('node-2')!;

    const player = manager.create({
      guild: '333333333333333333',
      voiceChannel: '444444444444444444',
      node: 'node-1',
    });

    // Update node stats so useableNodes picks node-2
    node1.stats.players = 1;
    node2.stats.players = 0;

    vi.spyOn(player, 'moveNode').mockResolvedValue(player as any);

    const emitSpy = vi.spyOn(manager, 'emit');

    manager.emit('NodeDisconnect', node1, { code: 1006, reason: 'abnormal closure' });

    // Wait for async promise chain to complete
    await new Promise(resolve => setImmediate(resolve));

    expect(emitSpy).toHaveBeenCalledWith('PlayerMigrated', player, node1, expect.any(Object));
  });

  it('does nothing when no other node is available', () => {
    const node1 = manager.nodes.get('node-1')!;
    const node2 = manager.nodes.get('node-2')!;

    const player = manager.create({
      guild: '555555555555555555',
      voiceChannel: '666666666666666666',
      node: 'node-1',
    });

    // Mark node-2 as disconnected so useableNodes returns undefined/null
    vi.spyOn(node2, 'connected', 'get').mockReturnValue(false);

    // Update node-1 stats (it's the only connected node now)
    node1.stats.players = 1;

    const moveNodeSpy = vi.spyOn(player, 'moveNode').mockResolvedValue(player as any);

    manager.emit('NodeDisconnect', node1, { code: 1006, reason: 'abnormal closure' });

    expect(moveNodeSpy).not.toHaveBeenCalled();
  });
});
