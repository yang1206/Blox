import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { EMPTY_ROUTE, NOT_FOUND_ROUTE, basicRoutes } from './routes'
import { setupRouterGuard } from './guard'
import { getToken } from '@/utils/auth'
import { isNullOrWhitespace } from '@/utils/common/is'
// import { useUserStore } from '@/store'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App) {
  // await addDynamicRoutes()
  setupRouterGuard(router)
  app.use(router)
}

export async function addDynamicRoutes() {
  router.addRoute(EMPTY_ROUTE)
  router.addRoute(NOT_FOUND_ROUTE)
  const token = getToken()

  // 没有token情况
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE)
    return
  }

  // 有token的情况
  try {
    // const userStore = useUserStore()
    // const permissionStore = usePermissionStore()
    // const accessRoutes = permissionStore.generateRoutes(userStore.role)
    // accessRoutes.forEach((route: RouteType) => {
    //   !router.hasRoute(route.name) && router.addRoute(route)
    // })
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    router.addRoute(NOT_FOUND_ROUTE)
  }
  catch (error) {
    console.error(error)
  }
}
