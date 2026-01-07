import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global variables like `describe`, `test`
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './test/setup.ts', // Setup file for Jest matchers
    css: false, // Disable CSS processing (Next.js handles CSS differently)
    mockReset: true,
  },
});
