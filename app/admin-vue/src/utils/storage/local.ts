import * as crypto from '@blox/utils'

const SecretKey = import.meta.env.AUTH_SECRET

interface StorageData {
  value: unknown
  expire: number | null
}

/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export function setLocal(
  key: string,
  value: unknown,
  expire: number | null = DEFAULT_CACHE_TIME,
) {
  const storageData: StorageData = {
    value,
    expire: expire !== null ? Date.now() + expire * 1000 : null,
  }
  const json = crypto.encrypto(storageData, SecretKey)
  window.localStorage.setItem(key, json)
}

export function getLocal<T>(key: string) {
  const json = window.localStorage.getItem(key)
  if (json) {
    let storageData: StorageData | null = null
    try {
      storageData = crypto.decrypto(json, SecretKey) as StorageData
    }
    catch { }
    if (storageData) {
      const { value, expire } = storageData
      // 没有过期时间或者在有效期内则直接返回
      if (expire === null || expire >= Date.now())
        return value as T
    }
    removeLocal(key)
    return null
  }
  return null
}

export function getLocalExpire(key: string): number | null {
  const json = window.localStorage.getItem(key)
  if (json) {
    let storageData: StorageData | null = null
    try {
      storageData = crypto.decrypto(json, SecretKey) as StorageData
    }
    catch { }
    if (storageData) {
      const { expire } = storageData
      return expire
    }
    return null
  }
  return null
}

export function removeLocal(key: string) {
  window.localStorage.removeItem(key)
}

export function clearLocal() {
  window.localStorage.clear()
}
