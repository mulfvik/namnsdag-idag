import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/namnsdag-idag/', // GitHub Pages repository name
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: true
  }
})
