export interface LoginForm {
  username: string
  password: string
}
export interface LoginData {
  id: string
  username: string
  nickname: string
  avatar: string
  email: string
  role: string
  status: string
  createTime: Date
  updateTime: Date
  token: string
}

export interface RegisterForm {
  username: string
  password: string
  confirm_password: string
}
export interface RegisterData {
  id: string
  username: string
  nickname: string
  password: string
  avatar: string
  email: string
  role: string
  status: string
  createTime: Date
  updateTime: Date
}

export interface MenuData {
  id: string
  name: string
  path: string
  sort: number
  icon: string
  show: boolean
  children: MenuData[]
  parent_id?: string
  label: string
}
