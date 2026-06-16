import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
      '/s/':  { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
  build: {
    rollupOptions: {
      output: {
        // Keep the React core in its own long-cached chunk shared by every
        // route. Per-route code-splitting (React.lazy in App.jsx) handles the
        // rest, so heavy tool libraries land in their own on-demand chunks.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
