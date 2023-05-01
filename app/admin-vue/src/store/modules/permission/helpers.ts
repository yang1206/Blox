import { MenuData } from '@/api/interface/user'
import type { RoutesType } from '~/typings/router'
import { asyncRoutes } from '@/router/routes'

export async function filterAsyncRoutes(menuInfo?: MenuData[]): Promise<RoutesType> {
  const ret: RoutesType = []
  // 根据后端返回的菜单添加路由
  Menu2Router(menuInfo)
  function Menu2Router(menuInfo?: MenuData[]) {
    for (const menu of menuInfo as MenuData[]) {
      if (!menu.children) {
        const route = asyncRoutes.find(route => (route.path === menu.path))

        if (menu.inlayout && route)
          route!.meta!.inlayout = menu.inlayout
        if (route)
          ret.push(route)
      }
      else {
        Menu2Router(menu.children)
      }
    }
  }
  return ret
}

export function getShowMenu(menu: MenuData[]) {
  const newTree = menu.filter(x => x.show)
  newTree.forEach(x => x.children && (x.children = getShowMenu(x.children)))
  return newTree
}
