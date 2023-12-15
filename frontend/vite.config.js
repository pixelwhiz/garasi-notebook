import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from "@vitejs/plugin-vue-jsx"
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [vue(), VueJsx(), VitePWA({
    registerType: 'prompt',
  })],
  build: {
    outDir: 'prod',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000
  },
})
