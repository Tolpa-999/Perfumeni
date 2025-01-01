import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // strictPort: true, // Optional, ensures port consistency
    // open: true, // Opens the browser automatically
  },
})
