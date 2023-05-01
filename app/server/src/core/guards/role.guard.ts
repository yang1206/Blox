import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import type { Reflector } from '@nestjs/core'
import type { UserEntity } from 'src/modules/user/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles)
      return true

    const req = context.switchToHttp().getRequest()
    let token = req.headers.authorization
    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop()
    }

    const user = this.jwtService.decode(token) as UserEntity
    if (!user)
      throw new UnauthorizedException('您没有权限')

    const hasRoles = roles.includes(user.role)

    if (!hasRoles)
      throw new UnauthorizedException('您没有权限')

    return user && user.role && hasRoles
  }
}
