import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
