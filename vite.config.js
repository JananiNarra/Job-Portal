import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ← ✅ This fixes broken imports on Netlify
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects',  // file in root
          dest: ''            // copied to dist/
        }
      ]
    })
  ]
})
