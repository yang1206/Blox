import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VexipUIResolver } from '@vexip-ui/plugins'

import { getSrcPath } from '../utils'
export default [
  DefineOptions(),
  AutoImport({
    resolvers: [VexipUIResolver({
      // importDarkTheme: true,
      importStyle: true,
    })],
    imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getSrcPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    resolvers: [VexipUIResolver()],
    dts: resolve(getSrcPath(), 'typings/components.d.ts'),
  }),
]
