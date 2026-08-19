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
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'charts'
            }
            if (id.includes('html5-qrcode')) {
              return 'scanner'
            }
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
})
