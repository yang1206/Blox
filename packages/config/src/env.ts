import * as fs from 'fs'
import * as path from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
const isProd = process.env.NODE_ENV === 'production'

function parseEnv() {
  const localEnv = path.resolve('../../.env')
  const prodEnv = path.resolve('../../.env.prod')
  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv))
    throw new Error('缺少环境配置文件')

  const filePath = isProd && (fs.existsSync(prodEnv) ? prodEnv : localEnv)
  const config: Record<string, unknown> = dotenv.parse(fs.readFileSync(filePath))
  return { filePath, config }
}
export const { filePath, config } = parseEnv()
