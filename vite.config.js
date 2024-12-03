import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/VT-Terminal/', // Add this line to match your GitHub repo name
})