import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.truvexsourcingnetworking.com',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://api.truvexsourcingnetworking.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
  test: {
    root,
    environment: 'jsdom',
    setupFiles: fileURLToPath(new URL('./src/test/setup.ts', import.meta.url)),
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
