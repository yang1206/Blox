import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import * as compression from 'compression'
import { mw as requestIpMw } from 'request-ip'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { json, urlencoded } from 'express'
import { Logger } from 'src/core/logger/log4j.util'
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter'
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor'
import { ValidationPipe } from 'src/core/pipe/validation.pipe'
import { AppModule } from './app.module'
// import { logger } from './core/logger/logger.middleware'
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(compression()) // 启用 gzip 压缩
  app.use(json({ limit: '10mb' })) // 修改请求的容量
  app.use(urlencoded({ limit: '10mb', extended: true }))
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter()) // 异常返回统一处理
  // app.useGlobalFilters(new ExceptionsFilter())
  // app.use(logger)
  app.useGlobalInterceptors(new TransformInterceptor()) // 正常返回统一处理
  app.useGlobalPipes(new ValidationPipe()) // 验证管道
  app.use(helmet()) // 设置安全响应头
  app.enableCors()
  app.use(requestIpMw({ attributeName: 'ip' }))// 获取真实 ip
  app.useStaticAssets(join(__dirname, process.env.SERVE_UPLOAD_FOLDER), {
    prefix: `/${process.env.SERVE_UPLOAD_FOLDER}`,
  })// 访问静态资源
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('博客Api')
    .setDescription('博客接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(1206)
}
bootstrap().then(() => {
  Logger.log('Server is running at http://localhost:1206')
  Logger.log('document is running at http://localhost:1206/docs')
})
