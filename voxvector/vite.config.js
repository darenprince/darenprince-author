import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const apiTarget = env.VITE_VOXVECTOR_API_URL || 'https://voxvector.crownlabs.tech'

  return {
    plugins: [react()],
    base: process.env.VITE_BASE_PATH || '/voxvector/',
    // Local browsers use the same origin; the upstream API still authenticates
    // every protected request. Production builds retain the configured API URL.
    define:
      command === 'serve'
        ? {
            'import.meta.env.VITE_VOXVECTOR_API_URL': JSON.stringify('/voxvector-api'),
          }
        : {},
    server: {
      proxy: {
        '^/voxvector-api(?:/|$)': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/voxvector-api/, '') || '/',
        },
      },
    },
  }
})
