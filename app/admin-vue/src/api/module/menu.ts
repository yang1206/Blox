import { MenuData, MenuDto } from '../interface/menu'
import request from '@/service'

export function menuRequest() {
  return request<any, MenuData[]>({
    url: '/menus',
    method: 'GET',
  })
}

export function menuRequestById(id: number) {
  return request<any, MenuData>({
    url: `/menus/${id}`,
    method: 'GET',
  })
}

export function addMenu(data: MenuDto) {
  return request<any, any>({
    url: '/menus',
    method: 'POST',
    data,
  })
}

export function editMenu(id: number, data: MenuDto) {
  return request<any, any>({
    url: `/menus/${id}`,
    method: 'PATCH',
    data,
  })
}

export function delMenu(id: number) {
  return request<any, MenuData>({
    url: `/menus/${id}`,
    method: 'Delete',
  })
}
