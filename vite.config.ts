import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
   
    ...configDefaults, // Apply Vitest's default configuration (if necessary)
    globals: true, // Enable global test functions like `describe`, `it`, etc.
    environment: 'jsdom', // Use jsdom to simulate a browser environment
  },
});
