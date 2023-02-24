# 📝 博客系统 📝

my-blog 是一个完全使用 TypeScript 编写的博客系统，它可以让你轻松的创建、编辑、管理和发布你的文章，完全支持MarkDown书写！

## 简介

使用TypeScript编写的完整的博客系统,通过这个项目你能学习到这些技术

- `Nest.js`: 服务端框架
- `Vue3`: 前端后台管理页面框架
- `Next.js`: 前端博客页面框架
- `MySQL`: 数据存储
- `Redis`: 数据缓存

## 技术栈细节

- [后端](./app/server/README.md)
- [后台管理](./app/admin-vue/README.md)
- [博客前端](./app/client/README.md)
  
## 项目运行

### 数据库

首先安装 `MySQL`，推荐使用 docker 进行安装。
<br />
拉取镜像
<br />

```bash
docker pull mysql:latest
```

<br />
启动服务，这里数据库密码为123456

```bash
docker run -itd --name mysql_local -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql/mysql-server
```

进入容器

```bash
docker exec -it mysql_local /bin/bash
```

然后创建表

```bash
mysql -u root -p;
CREATE DATABASE  `blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 本地运行

首先，clone 项目。

```bash
git clone --depth=1 https://github.com/yang1206/my-blog.git your-project-name
```

然后，安装项目依赖。

```bash
# 全局安装 pnpm
npm i -g pnpm
pnpm install
```

- 启动项目

```bash
pnpm run dev
```

前台页面地址：`http://localhost:3030`。
后台管理地址：`http://localhost:5173`。
服务接口地址：`http://localhost:1206`。

首次启动，默认创建管理员用户：admin，密码：yang1206（可在 `.env` 文件中进行修改）。
[PS] 如服务端配置启动失败，请先确认 MySQL 的配置是否正确，配置文件在 `.env`。

### 全局配置

根目录下的`.env`和`.env.prod`分别是本地与生产环境的配置文件

```bash
#服务端
# 数据库地址
DB_HOST=localhost  
# 数据库端口
DB_PORT=3306
# 数据库登录名
DB_USER=root
# 数据库登录密码
DB_PASSWORD=123456
# 数据库名字
DB_DATABASE=blog
# 服务端运行端口
SERVER_PORT=1206
# 服务端完整访问路径
SERVER_API_URL=http://localhost:1206/api
# 静态文件上传目录
SERVE_UPLOAD_FOLDER=upload

SALT= NestProject
AUTH_SECRET=yang1206
RT_AUTH_SECRET=yang1206

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=123456

ADMIN_USER = admin
ADMIN_PASSWD = yang1206

#管理端
VITE_APP_GLOB_BASE_API='/api/api'
VITE_APP_TITLE_VUE='博客后台管理系统 for Vue3'
# 是否启用压缩
VITE_USE_COMPRESS = true
# 压缩类型
VITE_COMPRESS_TYPE = gzip
VITE_PORT=5173
# 是否启用代理(只对本地vite server生效)
VITE_USE_PROXY = true
# 代理类型(跟启动和构建环境无关)  'dev' | 'test' | 'prod'
VITE_PROXY_TYPE = 'test'
# 是否hash路由模式
VITE_USE_HASH = false

#客户端
# 客户端运行端口
CLIENT_PORT=3030
# 客户端站点地址（假设部署到 https://xx.com, 就将 CLIENT_SITE_URL 设置为 https://xx.com）
CLIENT_SITE_URL=http://localhost:3030
# 客户端资源地址（假设部署到 https://xx.com，就将 CLIENT_ASSET_PREFIX 设置为 https://xx.com，如果将资源上传到 cdn ，那就改为 cdn 地址）
CLIENT_ASSET_PREFIX=/
```

![Alt](https://repobeats.axiom.co/api/embed/c964cacad1bfd31fe31ed0a73865ccd744baf3f5.svg "Repobeats analytics image")

## License

Blox is licensed under the MIT license. See [LICENSE](/LICENSE) for more details
