import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',       
  build: {
    outDir: 'out',
    // Tối ưu build cho production
    minify: 'esbuild', // esbuild is faster and default
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
        },
      },
    },
  },
  // Preview server config (cho testing build local)
  preview: {
    port: 4173,
    host: true,
  },
})
