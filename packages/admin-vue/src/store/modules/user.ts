import { defineStore } from 'pinia'
import { loginRequest } from '@/api'
import { clearLocal, getLocal, setLocal } from '@/utils'
import { LoginData, LoginForm } from '@/api/interface/user'
interface User {
  token?: string
  userInfo: LoginData
  role: string
}
export const useUserStore = defineStore('user', {
  state(): User {
    return {
      token: getLocal('token') || '',
      userInfo: getLocal('userinfo') as LoginData || null,
      role: '',
    }
  },
  getters: {
    getId(): string {
      return this.userInfo.id as string
    },
    getToken(): string {
      return this.token as string
    },
  },
  actions: {
    async asyncLogin(loginFrom: LoginForm) {
      const res = await loginRequest(loginFrom)
      const { token } = res.data

      this.token = token
      setLocal('token', token)
      this.userInfo = res.data
      this.role = String(res.data.role)
      setLocal('userinfo', this.userInfo)
    //   this.asyncGetMenu()
    },
    // async asyncGetMenu() {
    //   const menuInfo = await menuListRequest()
    //   this.menuInfo = menuInfo.data
    //   setLocal('menuinfo', menuInfo.data)
    // },
    logout() {
      // const { resetTabs } = useTabStore()

      clearLocal()
    //   toLogin()
    },
  },
})
