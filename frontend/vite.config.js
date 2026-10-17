import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [".replit.dev"],
    proxy: {
      "/concepts": "http://localhost:8000",
      "/examples": "http://localhost:8000",
      "/slots": "http://localhost:8000",
      "/options": "http://localhost:8000",
      "/health": "http://localhost:8000"
    }
  }
});
