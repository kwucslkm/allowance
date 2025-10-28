import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
// import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    // svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
