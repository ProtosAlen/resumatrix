import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // Setup file for tests
    include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'], // Coverage reporters
    },
  },
});
