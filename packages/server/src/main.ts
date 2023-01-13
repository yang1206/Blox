import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import * as compression from 'compression'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './core/filter/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { ValidationPipe } from './core/pipe/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(compression()) // 启用 gzip 压缩
  app.use(json({ limit: '10mb' })) // 修改请求的容量
  app.use(urlencoded({ limit: '10mb', extended: true }))
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter()) // 异常返回统一处理
  app.useGlobalInterceptors(new TransformInterceptor()) // 正常返回统一处理
  app.useGlobalPipes(new ValidationPipe()) // 验证管道
  app.use(helmet()) // 设置安全响应头
  app.enableCors()
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
  /* eslint-disable no-console */
  console.log('Server is running at http://localhost:1206')
}
bootstrap()
