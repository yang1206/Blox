import 'uno.css'
import '@/styles/reset.css'
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from '@/router'
import { setupStore } from '@/store'
const app = createApp(App)
setupStore(app)
app.use(MotionPlugin).use(router).mount('#app')
