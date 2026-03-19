// vite.config.js  (or vite.config.ts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Correct import for the official Tailwind Vite plugin (v4+)
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),          // ← this is correct now
  ],
  
  // Optional: add proxy for backend (fixes your "Cannot connect to server" issue)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})