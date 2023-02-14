import type { RouteType } from '@/typings/router'

export default {
  name: 'Menus',
  path: '/menus',
  component: () => import('@/views/menus/index.vue'),
  meta: {
    title: '菜单管理',
    icon: 'carbon:menu',
  },
} as RouteType
