import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '.',
    emptyOutDir: false,
    assetsDir: 'nexuswho-assets',
    rollupOptions: {
      input: {
        nexuswho: 'nexuswho.html',
      },
      output: {
        entryFileNames: 'nexuswho-assets/[name].js',
        chunkFileNames: 'nexuswho-assets/[name].js',
        assetFileNames: 'nexuswho-assets/[name][extname]',
      },
    },
  },
})
