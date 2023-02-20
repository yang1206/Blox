import { AxiosError } from 'axios'
import { request as ApiInstance, IResponse } from '..'
import { useUserStore } from '@/store'
import { getLocal, setLocal } from '@/utils'
const MAX_ERROR_COUNT = 5
let currentCount = 0
const queue: ((t: string) => any)[] = []
let isRefresh = false

export const refreshToken = async (error: AxiosError<IResponse>) => {
  const logout = () => {
    useUserStore().logout()
    return Promise.reject(error)
  }
  if (error!.config!.url?.includes('refresh'))
    logout()
  const refresh = getLocal('refresh_token') ?? null
  const { config } = error
  if (!refresh)
    logout()
  if (!isRefresh) {
    isRefresh = true
    if (currentCount > MAX_ERROR_COUNT)
      logout()
    currentCount += 1
    try {
      const { access_token, refresh_token } = await useUserStore().refreshToken()
      setLocal('token', access_token)
      setLocal('refresh_token', refresh_token)
      currentCount = 0
      // 重新请求
      queue.forEach(cb => cb(access_token))
      return ApiInstance.request(error.config as any)
    }
    catch {
      logout()
      return Promise.reject(error)
    }
    finally {
      isRefresh = false
    }
  }
  else {
    return new Promise((resolve) => {
      // 缓存网络请求，等token刷新后直接执行
      queue.push((newToken: string) => {
        Reflect.set(config!.headers!, 'authorization', newToken)
        resolve(ApiInstance.request<IResponse<any>>(config as any))
      })
    })
  }
}
