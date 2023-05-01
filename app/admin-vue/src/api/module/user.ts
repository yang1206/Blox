import type { LoginData, LoginForm, RegisterData, RegisterForm } from '../interface/user'
import request from '@/service'

export function loginRequest(data: LoginForm) {
  return request<LoginForm, LoginData>({
    url: '/login',
    method: 'POST',
    data,
  })
}

export function registerRequest(data: RegisterForm) {
  return request<RegisterForm, RegisterData>({
    url: '/user/register',
    method: 'POST',
    data,
  })
}

export function resfreshRequest(data: { id: string; refresh_token: string }) {
  return request<{ id: string; refresh_token: string }, {
    access_token: string
    refresh_token: string
  }>({
    url: 'auth/refresh',
    method: 'POST',
    data,
  })
}
