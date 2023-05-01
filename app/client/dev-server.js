const { config } = require('@blox/config');
const cli = require('next/dist/cli/next-dev');

const port = config.CLIENT_PORT || 3030;

try {
  cli.nextDev(['-p', port, '--turbo']);
  console.log(`客户端已启动，端口：${port}`);
} catch (err) {
  console.log(`客户端启动失败！${err.message || err}`);
}
