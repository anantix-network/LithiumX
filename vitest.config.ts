import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    benchmark: {
      include: ['tests/benchmark/*.bench.ts'],
    },
  },
});
