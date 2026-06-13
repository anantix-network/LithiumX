import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LithiumXPlayer } from '../../src/Structures/Player';
import { RepeatMode } from '../../src/Structures/Queue';
import { createTestManager } from '../helpers';

function createMockPlayer(): LithiumXPlayer {
  const manager = createTestManager();
  return manager.create({
    guild: '111111111111111111',
    voiceChannel: '222222222222222222',
  });
}

describe('LithiumXPlayer.setRepeatMode()', () => {
  let player: LithiumXPlayer;
  beforeEach(() => { player = createMockPlayer(); });

  it('sets queue.repeatMode to the given mode', () => {
    player.setRepeatMode(RepeatMode.Track);
    expect(player.queue.repeatMode).toBe(RepeatMode.Track);
  });

  it('sets trackRepeat=true when mode is Track', () => {
    player.setRepeatMode(RepeatMode.Track);
    expect(player.trackRepeat).toBe(true);
    expect(player.queueRepeat).toBe(false);
  });

  it('sets queueRepeat=true when mode is Queue', () => {
    player.setRepeatMode(RepeatMode.Queue);
    expect(player.queueRepeat).toBe(true);
    expect(player.trackRepeat).toBe(false);
  });

  it('clears both flags when mode is None', () => {
    player.setRepeatMode(RepeatMode.Track);
    player.setRepeatMode(RepeatMode.None);
    expect(player.trackRepeat).toBe(false);
    expect(player.queueRepeat).toBe(false);
    expect(player.queue.repeatMode).toBe(RepeatMode.None);
  });

  it('emits PlayerStateUpdate', () => {
    const emitSpy = vi.spyOn(player.manager, 'emit');
    player.setRepeatMode(RepeatMode.Queue);
    expect(emitSpy).toHaveBeenCalledWith('PlayerStateUpdate', expect.anything(), player);
  });
});

describe('setTrackRepeat delegates to setRepeatMode', () => {
  let player: LithiumXPlayer;
  beforeEach(() => { player = createMockPlayer(); });

  it('setTrackRepeat(true) sets queue.repeatMode = Track', () => {
    player.setTrackRepeat(true);
    expect(player.queue.repeatMode).toBe(RepeatMode.Track);
  });

  it('setTrackRepeat(false) sets queue.repeatMode = None', () => {
    player.setTrackRepeat(true);
    player.setTrackRepeat(false);
    expect(player.queue.repeatMode).toBe(RepeatMode.None);
  });
});

describe('setQueueRepeat delegates to setRepeatMode', () => {
  let player: LithiumXPlayer;
  beforeEach(() => { player = createMockPlayer(); });

  it('setQueueRepeat(true) sets queue.repeatMode = Queue', () => {
    player.setQueueRepeat(true);
    expect(player.queue.repeatMode).toBe(RepeatMode.Queue);
  });

  it('setQueueRepeat(false) sets queue.repeatMode = None', () => {
    player.setQueueRepeat(true);
    player.setQueueRepeat(false);
    expect(player.queue.repeatMode).toBe(RepeatMode.None);
  });
});
