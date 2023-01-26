import 'uno.css'
import '@/styles/index.scss'
import '@/styles/vexip.scss'
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
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
  await setupStore(app)
  await setupRouter(app)
  app.use(VueQueryPlugin, vueQueryPluginOptions).use(autoAnimatePlugin).use(MotionPlugin).mount('#app')
}
setupApp()
