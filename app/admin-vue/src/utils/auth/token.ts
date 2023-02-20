import { getLocal, removeLocal, setLocal } from '@/utils'
// import api from '@/api'

const TOKEN_CODE = 'token'
/** token过期时间：6小时 */
const DURATION = 6 * 60 * 60

export function getToken() {
  return getLocal(TOKEN_CODE)
}

export function setToken(token: string) {
  setLocal(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  removeLocal(TOKEN_CODE)
}
