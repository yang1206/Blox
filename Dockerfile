FROM --platform=linux/amd64 node:lts-alpine AS build
WORKDIR /app


# 如果各公司有自己的私有源，可以替换registry地址,如使用官方源注释下一行
RUN npm config set registry https://registry.npmmirror.com/
# 安装pnpm
RUN npm install -g pnpm

# 安装开发期依赖
COPY . . ./
RUN pnpm i
# 安装开发期依赖

# 构建项目
COPY . .
RUN pnpm build

FROM --platform=linux/amd64 node:lts-alpine
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 如果各公司有自己的私有源，可以替换registry地址,如使用官方源注释下一行
RUN npm config set registry https://registry.npmmirror.com/

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/.env /app/.env.prod /app/app /app/packages ./

# 安装tzdata,默认的alpine基础镜像不包含时区组件，安装后可通过TZ环境变量配置时区
RUN apk add --no-cache tzdata
RUN apk add --no-cache autoconf
# 设置时区为中国东八区，这里的配置可以被docker-compose.yml或docker run时指定的时区覆盖
ENV TZ="Asia/Shanghai"

RUN pnpm i && pnpm start
