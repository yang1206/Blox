import 'uno.css'
import '@/styles/index.scss'
import '@/styles/vexip.scss'
import { createApp } from 'vue'
import { Confirm, Loading, Toast } from 'vexip-ui'
import { MotionPlugin } from '@vueuse/motion'
import { createHead } from '@vueuse/head'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
async function setupApp() {
  const app = createApp(App)
  const head = createHead()
  await setupStore(app)
  await setupRouter(app)
  app
    .use(VueQueryPlugin, vueQueryPluginOptions)
    .use(autoAnimatePlugin)
    .use(head)
    .use(MotionPlugin)
    .use(Confirm)
    .use(Loading)
    .use(Toast)
    .mount('#app')
}
setupApp()
