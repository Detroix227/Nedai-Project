import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const electronBuild = process.env.ELECTRON_BUILD === '1'

// https://vitejs.dev/config/
export default defineConfig({
  base: electronBuild ? './' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: electronBuild
      ? path.resolve(__dirname, '../nedai-desktop/web/dist')
      : 'dist',
    emptyOutDir: true,
  },
})
