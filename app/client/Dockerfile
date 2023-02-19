FROM node:18

WORKDIR /server


ENV TZ=Asia/Shanghai

RUN pnpm i && pnpm run build && pnpm dev

EXPOSE 3030