import * as crypto from '@blox/utils'

const SecretKey = import.meta.env.AUTH_SECRET
export function setSession(key: string, value: unknown) {
  const json = crypto.encrypto(value, SecretKey)
  sessionStorage.setItem(key, json)
}

export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = crypto.decrypto(json, SecretKey) as any
    }
    catch { }
  }
  return data
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

export function clearSession() {
  window.sessionStorage.clear()
}
