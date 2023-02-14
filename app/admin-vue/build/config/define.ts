import { format } from 'date-fns'
import pkg from '../../package.json'
const { dependencies, devDependencies, name, version } = pkg
/**
 * * 此处定义的是全局常量，启动或打包后将添加到window中
 * https://vitejs.cn/config/#define
 */
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
}

export const viteDefine = {
  __APP_INFO__,
}
