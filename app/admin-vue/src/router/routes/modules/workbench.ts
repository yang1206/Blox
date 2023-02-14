import type { RouteType } from '@/typings/router'

export default {
  name: 'Workbench',
  path: '/workbench',
  component: () => import('@/views/workbench/index.vue'),
  meta: {
    title: '工作台',
    icon: 'carbon:dashboard',
  },
} as RouteType
