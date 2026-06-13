import { describe, it, expect, beforeEach } from 'vitest';
import { LithiumXQueue, RepeatMode } from '../../src/Structures/Queue';
import type { Track } from '../../src/Structures/Player';

function makeTrack(title: string): Track {
  return { title, uri: `https://example.com/${title}`, duration: 180000 } as unknown as Track;
}

describe('RepeatMode enum', () => {
  it('exports None, Track, Queue values', () => {
    expect(RepeatMode.None).toBe('none');
    expect(RepeatMode.Track).toBe('track');
    expect(RepeatMode.Queue).toBe('queue');
  });
});

describe('LithiumXQueue.repeatMode', () => {
  let queue: LithiumXQueue;
  beforeEach(() => { queue = new LithiumXQueue(); });

  it('defaults to RepeatMode.None', () => {
    expect(queue.repeatMode).toBe(RepeatMode.None);
  });

  it('can be set to any RepeatMode value', () => {
    queue.repeatMode = RepeatMode.Track;
    expect(queue.repeatMode).toBe(RepeatMode.Track);
    queue.repeatMode = RepeatMode.Queue;
    expect(queue.repeatMode).toBe(RepeatMode.Queue);
    queue.repeatMode = RepeatMode.None;
    expect(queue.repeatMode).toBe(RepeatMode.None);
  });
});

describe('LithiumXQueue.history', () => {
  let queue: LithiumXQueue;
  beforeEach(() => { queue = new LithiumXQueue(); });

  it('starts empty', () => {
    expect(queue.history).toEqual([]);
  });

  it('pushHistory prepends track to history', () => {
    const t1 = makeTrack('a');
    const t2 = makeTrack('b');
    queue.pushHistory(t1);
    queue.pushHistory(t2);
    expect(queue.history[0]).toBe(t2);
    expect(queue.history[1]).toBe(t1);
  });

  it('popHistory removes and returns the most recent entry', () => {
    const t1 = makeTrack('a');
    const t2 = makeTrack('b');
    queue.pushHistory(t1);
    queue.pushHistory(t2);
    expect(queue.popHistory()).toBe(t2);
    expect(queue.history).toHaveLength(1);
    expect(queue.history[0]).toBe(t1);
  });

  it('popHistory returns null when history is empty', () => {
    expect(queue.popHistory()).toBeNull();
  });

  it('previous getter returns history[0] or null', () => {
    expect(queue.previous).toBeNull();
    const t = makeTrack('x');
    queue.pushHistory(t);
    expect(queue.previous).toBe(t);
  });
});

describe('LithiumXQueue history size limit', () => {
  it('evicts oldest entry when history exceeds maxHistorySize', () => {
    const queue = new LithiumXQueue();
    queue.maxHistorySize = 3;
    const tracks = ['a', 'b', 'c', 'd'].map(makeTrack);
    for (const t of tracks) queue.pushHistory(t);
    expect(queue.history).toHaveLength(3);
    expect(queue.history[0]).toBe(tracks[3]); // d
    expect(queue.history[1]).toBe(tracks[2]); // c
    expect(queue.history[2]).toBe(tracks[1]); // b
  });

  it('default maxHistorySize is 50', () => {
    const queue = new LithiumXQueue();
    expect(queue.maxHistorySize).toBe(50);
  });
});
