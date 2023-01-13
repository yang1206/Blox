import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
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
    name: 'home',
    redirect: '/login',
  },
]
