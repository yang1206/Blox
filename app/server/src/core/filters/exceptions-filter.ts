import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, HttpStatus } from '@nestjs/common'
import { Logger } from '../logger/log4j.util'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const logFormat = `-----------------------------------------------------------------------
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${status}
      Response: ${exception}
      -----------------------------------------------------------------------
      `
    Logger.error(logFormat)
    response.status(status).json({
      message: `Service Error: ${exception}`,
      status,
    })
  }
}
