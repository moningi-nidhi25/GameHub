import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg', 'favicon-96x96.png'],
        workbox: {
          // Only use globPatterns in production to avoid dev-mode 'no files matched' warnings
          globPatterns: isDev ? [] : ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webmanifest}'],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html',
        },
        manifest: {
          id: '/',
          name: 'GameHub: Cosmic Edition',
          short_name: 'GameHub',
          description: 'Elite collection of classic & modern games with Cosmic Neon UI.',
          lang: 'en',
          theme_color: '#050508',
          background_color: '#050508',
          display: 'standalone',
          orientation: 'any',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/web-app-manifest-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/web-app-manifest-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/web-app-manifest-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          screenshots: [
            {
              src: '/homepage.png',
              sizes: '1917x976',
              type: 'image/png',
              form_factor: 'wide',
              label: 'GameHub Cosmic Library (Desktop)'
            },
            {
              src: '/homepage.png',
              sizes: '1917x976',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'GameHub Cosmic Library (Mobile)'
            }
          ]
        }
      })
    ],
    server: {
      proxy: {
        '/api': 'http://localhost:8000',
        '/accounts': 'http://localhost:8000',
      }
    }
  }
})
