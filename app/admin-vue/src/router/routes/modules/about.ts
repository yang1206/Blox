import type { RouteType } from '@/typings/router'

export default {
  name: 'About',
  path: '/about',
  component: () => import('@/views/about/index.vue'),
  meta: {
    title: '关于项目',
    icon: 'carbon:ibm-z-os-package-manager',
  },
} as RouteType
