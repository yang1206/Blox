import type { LoginData, LoginForm } from '../interface/user'
import request from '@/service'

export const loginRequest = (data: LoginForm) => {
  return request<LoginForm, LoginData>({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}
