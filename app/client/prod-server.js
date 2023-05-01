const { config } = require('@blox/config')
const cli = require('next/dist/cli/next-start')
const buildcli = require('next/dist/cli/next-build')

const port = config.CLIENT_PORT || 3030
console.log(port)
try {
  // buildcli.nextBuild(['-p',prot])
  cli.nextStart(['-p', port])
  console.log(`客户端已启动，端口：${port}`)
}
catch (err) {
  console.log('请先build后再预览')
}
