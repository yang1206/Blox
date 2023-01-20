import { defineStore } from 'pinia'
import { filterAsyncRoutes } from './helpers'
import { basicRoutes } from '@/router/routes'
import type { RoutesType } from '@/typings/router'
import { MenuData } from '@/api/interface/user'
import { menuRequest } from '@/api'
import { getLocal, setLocal } from '@/utils'

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType> [],
      menuInfo: getLocal('menuinfo') as MenuData[] || null,
    }
  },
  getters: {
    routes(): RoutesType {
      return basicRoutes.concat(this.accessRoutes)
    },
  },
  actions: {
    async generateRoutes(): Promise<RoutesType> {
      const accessRoutes = await filterAsyncRoutes(this.menuInfo)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
    async asyncGetMenu() {
      const { data } = await menuRequest()
      this.menuInfo = data
      setLocal('menuinfo', data)
    },
    resetPermission() {
      this.$reset()
    },
  },
})
