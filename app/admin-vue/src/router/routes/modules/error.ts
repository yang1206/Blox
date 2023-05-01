import type { RouteType } from '~/typings/router'

function Layout() {
  return import('@/layouts/index.vue')
}

export default {
  name: 'ErrorPage',
  path: '/error-page',
  component: Layout,
  redirect: '/error-page/404',
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      name: 'ERROR-404',
      path: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
} as RouteType
