// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '', // Set base to empty string
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'script.js',
        chunkFileNames: 'script-[hash].js',
        assetFileNames: 'style.css',
      },
    },
  },
});