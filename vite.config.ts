import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import tailwind from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwind()],
  resolve: {
    alias: {
      '@': fileURLToPath(import.meta.resolve('./src')),
      '@ui': fileURLToPath(import.meta.resolve('./ui')),
      '@lib': fileURLToPath(import.meta.resolve('./lib')),
      '@registry': fileURLToPath(import.meta.resolve('./registry')),
    },
  },
});
