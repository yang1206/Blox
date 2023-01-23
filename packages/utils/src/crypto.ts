import * as CryptoJS from 'crypto-js'

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any, SecretKey: string): string {
  const newData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(newData, SecretKey).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string, SecretKey: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SecretKey)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText)
    return JSON.parse(originalText)

  return null
}

/**
     * 检测密码是否一致
     * @param password0 加密前密码
     * @param password1 加密后密码
     * @param SecretKey key
     */
export function compare(password0: string, password1: string, SecretKey: string) {
  const decryptoPwd = decrypto(password1, SecretKey)
  if (decryptoPwd === password0)
    return true
  return false
}
