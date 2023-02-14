import { MenuData, MenuDto } from '../interface/menu'
import request from '@/service'
export const menuRequest = () => {
  return request<any, MenuData[]>({
    url: '/menus',
    method: 'GET',
  })
}

export const menuRequestById = (id: number) => {
  return request<any, MenuData>({
    url: `/menus/${id}`,
    method: 'GET',
  })
}

export const addMenu = (data: MenuDto) => {
  return request<any, any>({
    url: '/menus',
    method: 'POST',
    data,
  })
}

export const editMenu = (id: number, data: MenuDto) => {
  return request<any, any>({
    url: `/menus/${id}`,
    method: 'PATCH',
    data,
  })
}

export const delMenu = (id: number) => {
  return request<any, MenuData>({
    url: `/menus/${id}`,
    method: 'Delete',
  })
}
