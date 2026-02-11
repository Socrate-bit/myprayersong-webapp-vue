import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    // visualizer({
    //   open: true,
    //   filename: "bundle-report.html",
    //   gzipSize: true,
    //   brotliSize: true
    // }),
    // cssInjectedByJsPlugin(),
    {
      name: 'inject-skeleton',
      transformIndexHtml(html) {
        try {
          const skeleton = fs.readFileSync('./src/Skeleton.html', 'utf-8')
          return html.replace('<div id="app"></div>', `<div id="app">${skeleton}</div>`)
        } catch (e) {
          console.warn('Skeleton loader not found, skipping injection', e)
          return html
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
