import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Logger } from '../logger/log4j.util'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() // 获取请求上下文
    const response = ctx.getResponse() // 获取请求上下文中的 response对象
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR // 获取异常状态码
    const exceptionResponse: any = exception.getResponse()
    const logFormat = `-----------------------------------------------------------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${`${exception.toString()}`}
        -----------------------------------------------------------------------
        `
    let validMessage = ''

    if (typeof exceptionResponse === 'object') {
      validMessage
        = typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0]
    }
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`
    const errorResponse = {
      message: validMessage || message,
      status,
    }

    // 设置返回的状态码， 请求头，发送错误信息
    Logger.error(logFormat)
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
