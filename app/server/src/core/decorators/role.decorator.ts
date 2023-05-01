import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'

import { ApiBearerAuth /* ApiUnauthorizedResponse */ } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard'

type ROLES = 'admin' | 'visitor'
/**
 * 自定义角色验证装饰器
 * @param roles
 */
export function Roles(...roles: ROLES[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(), // swagger文档设置token
    // ApiUnauthorizedResponse({ description: '您没有权限操作' })
  )
}
