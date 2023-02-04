import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VexipUIResolver } from '@vexip-ui/plugins'

import { getSrcPath } from '../utils'
export default [
  AutoImport({
    // resolvers: [VexipUIResolver({
    //   // importDarkTheme: true,
    //   importStyle: true,
    // })],
    imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getSrcPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    resolvers: [VexipUIResolver({
      importStyle: true,
    })],
    dts: resolve(getSrcPath(), 'typings/components.d.ts'),
  }),
]
