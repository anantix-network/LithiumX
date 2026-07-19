import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TrackUtils } from '../../src/Structures/Utils';
import { createTestManager } from '../helpers';
import type { LithiumXPlayer } from '../../src/Structures/Player';
import type { LithiumXManager } from '../../src/Structures/Manager';

describe('Player.prefetchNext()', () => {
  let manager: LithiumXManager;
  let player: LithiumXPlayer;

  beforeEach(() => {
    manager = createTestManager({ prefetch: true });
    player = manager.create({
      guild: '777777777777777777',
      voiceChannel: '888888888888888888',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves UnresolvedTrack at queue[0] in-place', async () => {
    const unresolvedTrack = TrackUtils.buildUnresolved('lofi beats', 'user1');
    const resolvedTrack = { title: 'Lofi Beats', track: 'base64==', duration: 180000 } as any;

    player.queue.push(unresolvedTrack);

    vi.spyOn(TrackUtils, 'isUnresolvedTrack').mockReturnValue(true);
    vi.spyOn(TrackUtils, 'getClosestTrack').mockResolvedValue(resolvedTrack);

    await player.prefetchNext();

    expect(player.queue[0]).toBe(resolvedTrack);
  });

  it('does nothing when queue[0] is already a resolved Track', async () => {
    const resolvedTrack = { title: 'Resolved', track: 'base64==' } as any;
    player.queue.push(resolvedTrack);

    const getClosestSpy = vi.spyOn(TrackUtils, 'getClosestTrack');
    vi.spyOn(TrackUtils, 'isUnresolvedTrack').mockReturnValue(false);

    await player.prefetchNext();

    expect(getClosestSpy).not.toHaveBeenCalled();
  });

  it('does nothing when queue is empty', async () => {
    const getClosestSpy = vi.spyOn(TrackUtils, 'getClosestTrack');

    await player.prefetchNext();

    expect(getClosestSpy).not.toHaveBeenCalled();
  });

  it('silently ignores resolution errors (fallback at play time)', async () => {
    const unresolvedTrack = TrackUtils.buildUnresolved('bad track', 'user1');
    player.queue.push(unresolvedTrack);

    vi.spyOn(TrackUtils, 'isUnresolvedTrack').mockReturnValue(true);
    vi.spyOn(TrackUtils, 'getClosestTrack').mockRejectedValue(new Error('not found'));

    await expect(player.prefetchNext()).resolves.toBeUndefined();
    expect(player.queue[0]).toBe(unresolvedTrack); // unchanged
  });
});
