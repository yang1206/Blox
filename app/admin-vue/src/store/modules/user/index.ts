import { defineStore } from 'pinia'
import { usePermissionStore } from '../permission'
import { loginRequest, resfreshRequest } from '@/api'
import { getLocal, removeLocal, setLocal } from '@/utils'
import type { LoginData, LoginForm } from '@/api/interface/user'
import { router } from '@/router'

interface User {
  token?: string
  refresh_token?: string
  userInfo: LoginData
  role: string
}
export const useUserStore = defineStore('user', {
  state(): User {
    return {
      token: getLocal('token') || '',
      refresh_token: getLocal('refresh_token') || '',
      userInfo: getLocal('userinfo') as LoginData || null,
      role: (getLocal('userinfo') as LoginData)?.role,
    }
  },
  getters: {
    getId(): string {
      return this.userInfo?.id as string
    },
    getToken(): string {
      return this.token as string
    },
    getRefreshToken(): string {
      return this.refresh_token as string
    },
  },
  actions: {
    async asyncLogin(loginFrom: LoginForm) {
      const res = await loginRequest(loginFrom)
      const { token, refreshToken } = res.data
      this.token = token
      setLocal('token', token)
      setLocal('refresh_token', refreshToken)
      this.userInfo = res.data
      this.role = String(res.data.role)
      setLocal('userinfo', this.userInfo)
      const usePermission = usePermissionStore()
      await usePermission.asyncGetMenu()
    },
    async refreshToken() {
      const res = await resfreshRequest({ id: this.userInfo.id, refresh_token: getLocal('refresh_token') as string })
      return res.data
    },

    logout() {
      // const { resetTabs } = useTabStore()
      removeLocal('userinfo')
      removeLocal('token')
      removeLocal('refresh_token')
      removeLocal('menuinfo')
      router.push('/login')
    },
  },
})
