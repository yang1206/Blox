import 'uno.css'
import '@/styles/reset.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

async function setupApp() {
  const app = createApp(App)
  await setupStore(app)
  await setupRouter(app)
  app.use(VueQueryPlugin).use(autoAnimatePlugin).use(MotionPlugin).mount('#app')
}
setupApp()
