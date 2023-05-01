import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Loading, Message } from 'vexip-ui'
import Request from './request'
import type { RequestConfig } from './request/types'
import { resolveResError } from './request/helpers'
import { refreshToken } from './request/refreshToken'
import { getLocal } from '@/utils'

export interface IResponse<T = any> {
  data: T
  message: string
  status: number
}
// 重写返回类型
interface HttpRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T
}
export const request = new Request({
  baseURL: import.meta.env.VITE_APP_GLOB_BASE_API,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: AxiosRequestConfig) => {
      Loading.open(10)
      const token = getLocal('token')
      if (token)
        config.headers!.Authorization = `Bearer ${token}`

      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      Loading.open(100)
      return result
    },
    responseInterceptorsCatch: (error) => {
      const ErrorFn = (msg?: string) => {
        Loading.open({
          percent: 100,
          maxPercent: 100,
          state: 'error',
        })
        const message = resolveResError(error.response.status, error.response.data.message)
        Message.error({
          content: msg || message,
        })
        return Promise.reject(new Error(error))
      }
      if (error.response.status === 401) {
        // 如果是401，尝试刷新token
        refreshToken(error).catch(() => {
          ErrorFn('身份验证失败')
        })
      }
      else {
        ErrorFn()
      }
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {HttpRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
function HttpRequest<D = any, T = any>(config: HttpRequestConfig<D, T>) {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET')
    config.params = config.data

  return request.request<IResponse<T>>(config)
}
// 取消请求
export function cancelRequest(url: string | string[]) {
  return request.cancelRequest(url)
}
// 取消全部请求
export function cancelAllRequest() {
  return request.cancelAllRequest()
}

export default HttpRequest
