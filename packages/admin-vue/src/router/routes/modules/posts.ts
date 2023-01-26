import type { RouteType } from '@/typings/router'

export default [{
  name: 'Posts',
  path: '/posts',
  component: () => import('@/views/posts/index.vue'),
  meta: {
    title: '全部文章',
    icon: 'carbon:edit',
  },
},
{
  name: 'Category',
  path: '/category',
  component: () => import('@/views/posts/category/index.vue'),
  meta: {
    title: '分类管理',
    icon: 'carbon:category-add',
  },
},
{
  name: 'Editor',
  path: '/posts/editor',
  component: () => import('@/views/posts/editor/index.vue'),
  meta: {
    title: '文章编辑',
    icon: 'carbon:edit',
    inlayout: false,
  },
},
{
  name: 'Tags',
  path: '/tags',
  component: () => import('@/views/posts/tags/index.vue'),
  meta: {
    title: '标签管理',
    icon: 'carbon:tag',
  },
},
] as RouteType[]
