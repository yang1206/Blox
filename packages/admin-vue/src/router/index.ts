import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { routes } from './routes'
import { setupRouterGuard } from './guard'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}
