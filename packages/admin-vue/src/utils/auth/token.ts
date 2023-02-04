import { useUserStore } from '@/store'
import { getLocal, getLocalExpire, removeLocal, setLocal } from '@/utils'
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

export async function refreshAccessToken() {
  const expire: number | null = getLocalExpire(TOKEN_CODE)

  if (!expire || expire - new Date().getTime() > 1000 * 60 * 5)
    return

  try {
    const { access_token, refresh_token } = await useUserStore().refreshToken()
    setLocal('token', access_token, 1000 * 60 * 30)
    setLocal('refresh_token', refresh_token)
  }
  catch {
    // 无感刷新，有异常也不提示
  }
}
