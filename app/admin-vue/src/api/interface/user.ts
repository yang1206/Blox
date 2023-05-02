export interface LoginForm {
  /** 用户名 */
  username: string
  /** 密码 */
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
  refreshToken: string
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
