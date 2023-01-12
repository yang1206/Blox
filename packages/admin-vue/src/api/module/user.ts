import type { LoginData, LoginForm, RegisterData, RegisterForm } from '../interface/user'
import request from '@/service'

export const loginRequest = (data: LoginForm) => {
  return request<LoginForm, LoginData>({
    url: '/login',
    method: 'POST',
    data,
  })
}

export const registerRequest = (data: RegisterForm) => {
  return request<RegisterForm, RegisterData>({
    url: '/user/register',
    method: 'POST',
    data,
  })
}
