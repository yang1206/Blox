export interface MenuData {
  id: number
  name: string
  path: string
  sort: number
  icon: string
  show: boolean
  children: MenuData[]
  parent_id?: number
  inlayout: boolean
}

export interface MenuDto {
  name: string
  path: string
  sort: number
  icon: string
  show: boolean
  parent_id?: number
  inlayout: boolean
  id?: number
}
