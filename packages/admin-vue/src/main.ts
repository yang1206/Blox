import 'uno.css'
import '@/styles/reset.css'
import 'vexip-ui/css/index.css'
import 'vexip-ui/themes/dark/index.css' // 不需要暗黑主题时无需引入
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
const app = createApp(App)
await setupStore(app)
await setupRouter(app)
app.use(MotionPlugin).mount('#app')
