import { RouteRecordRaw } from 'vue-router'

interface Meta {
  title?: string
  icon?: string
  customIcon?: string
  order?: number
  role?: string
  requireAuth?: boolean
}

interface RouteItem {
  name: string
  path: string
  redirect?: string
  meta?: Meta,
  children?: RoutesType
}

type RouteType = RouteRecordRaw & RouteItem

type RoutesType = Array<RouteType>

/** 前端导入的路由模块 */
type RouteModule = Record<string, { default: RouteType | Array<RouteType> }>