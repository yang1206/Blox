import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { map } from 'rxjs'
import { Logger } from '../logger/log4j.util'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req

    return next.handle().pipe(
      map((data) => {
        const logFormat = `-----------------------------------------------------------------------
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data: ${JSON.stringify(data.data)}
        -----------------------------------------------------------------------`
        Logger.info(logFormat)
        const ctx = context.switchToHttp()
        const response = ctx.getResponse()
        const status = response.statusCode
        const res = {
          data,
          status,
          msg: 'success',
        }
        Logger.info(logFormat)
        Logger.access(logFormat)
        return res
      }),
    )
  }
}
