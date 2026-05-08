import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react','react-dom'],
          'three-vendor':  ['three','@react-three/fiber','@react-three/drei'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
})
