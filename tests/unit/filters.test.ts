import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Filters, FilterPresets } from '../../src/Structures/Filters';
import { createMockPlayerForFilters } from '../helpers';

describe('Filters.setHighSpeed()', () => {
  let filters: Filters;

  beforeEach(() => {
    const player = createMockPlayerForFilters();
    filters = new Filters(player);
  });

  it('sets default timescale (1.5 / 1.0 / 1.0) when called with no args', () => {
    filters.setHighSpeed();
    expect(filters.timescale).toEqual({ speed: 1.5, pitch: 1.0, rate: 1.0 });
  });

  it('sets custom speed when opts.speed provided', () => {
    filters.setHighSpeed({ speed: 2.0 });
    expect(filters.timescale).toEqual({ speed: 2.0, pitch: 1.0, rate: 1.0 });
  });

  it('merges partial opts with defaults', () => {
    filters.setHighSpeed({ pitch: 1.2 });
    expect(filters.timescale).toEqual({ speed: 1.5, pitch: 1.2, rate: 1.0 });
  });

  it('clears timescale when called with false', () => {
    filters.setHighSpeed();
    filters.setHighSpeed(false);
    expect(filters.timescale).toBeNull();
  });

  it('tracks filter status as true when enabled', () => {
    filters.setHighSpeed();
    expect(filters.getFilterStatus('highSpeed')).toBe(true);
  });

  it('tracks filter status as false when disabled', () => {
    filters.setHighSpeed();
    filters.setHighSpeed(false);
    expect(filters.getFilterStatus('highSpeed')).toBe(false);
  });

  it('resets highSpeed status in clearFilters()', async () => {
    filters.setHighSpeed();
    await filters.clearFilters();
    expect(filters.getFilterStatus('highSpeed')).toBe(false);
  });
});

describe('FilterPresets.highSpeed()', () => {
  it('returns default FilterOptions timescale (1.5/1.0/1.0)', () => {
    expect(FilterPresets.highSpeed()).toEqual({
      timescale: { speed: 1.5, pitch: 1.0, rate: 1.0 },
    });
  });

  it('accepts custom params', () => {
    expect(FilterPresets.highSpeed(2.0, 1.1, 0.9)).toEqual({
      timescale: { speed: 2.0, pitch: 1.1, rate: 0.9 },
    });
  });
});
