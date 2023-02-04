import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import unplugins from './unplugin'
import { setupHtmlPlugin } from './html'

export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins = [
    vue(),
    vueJsx(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }), ...unplugins, unocss(), setupHtmlPlugin(viteEnv)]

  if (viteEnv.VITE_USE_COMPRESS) {
    plugins.push(
      viteCompression({ algorithm: viteEnv.VITE_COMPRESS_TYPE || 'gzip' }),
      viteImagemin({
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        webp: {
          quality: 0.8,
        },
      }),
    )
  }

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    )
  }

  return plugins
}
