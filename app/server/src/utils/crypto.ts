import * as crypto from 'node:crypto'
import type { Buffer } from 'node:buffer'

// 计算 流 MD5
export function encryptFileMD5(buffer: Buffer) {
  const md5 = crypto.createHash('md5')

  return md5.update(buffer).digest('hex')
}

export function getUUID() {
  return crypto.randomUUID()
}
