import type { RouteModule, RouteType, RoutesType } from '~/typings/router'
export const basicRoutes: RoutesType = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登陆',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/workbench',
    name: 'layout',
    meta: {
      title: '首页',
      icon: 'carbon:home',
    },
    component: () => import('@/layouts/index.vue'),
    children: [],
  },
]

export const NOT_FOUND_ROUTE: RouteType = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

export const EMPTY_ROUTE: RouteType = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: () => {},
}

const modules = import.meta.glob('./modules/**/*.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []

Object.keys(modules).forEach((key) => {
  if ((modules[key].default as RouteType[]).length) {
    (modules[key].default as RouteType[]).forEach((item) => {
      asyncRoutes.push(item as RouteType)
    })
  }
  else {
    asyncRoutes.push(modules[key].default as RouteType)
  }
})

export { asyncRoutes }
