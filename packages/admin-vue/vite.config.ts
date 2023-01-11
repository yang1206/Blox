import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VexipUIResolver } from '@vexip-ui/plugins'
import Unocss from 'unocss/vite'
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VexipUIResolver({
        // importDarkTheme: true,
        // importStyle: true,
      })],
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dirs: [path.resolve(pathSrc, 'composables')],
      vueTemplate: true,
      dts: path.resolve(pathSrc, 'typings/auto-import.d.ts'),
    }),
    Components({
      resolvers: [VexipUIResolver()],
      dts: path.resolve(pathSrc, 'typings/components.d.ts'),
    }),
    Unocss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
  },
  envDir: '../../',
  envPrefix: ['VITE_', 'AUTH_'],
})
