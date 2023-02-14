import { ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { StrategyOptions } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { RedisCacheService } from 'src/core/cache/redis.service'
import type { Request } from 'express'
import { AuthService } from '../auth.service'
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('AUTH_SECRET'),
      passReqToCallback: true,
    } as StrategyOptions)
  }

  async validate(req: Request, payload: UserEntity) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    const cacheToken = await this.redisCacheService.get(
           `${payload.id}&${payload.username}&${payload.role}`,
    )

    if (!cacheToken)
      throw new UnauthorizedException('token 已过期')
    if (token !== cacheToken)
      throw new UnauthorizedException('token不正确')

    const existUser = await this.authService.getUser(payload)
    if (!existUser)
      throw new UnauthorizedException('身份验证失败')
    // 重置token过期时间
    this.redisCacheService.set(
           `${payload.id}&${payload.username}&${payload.role}`,
           token,
           3600,
    )
    return existUser
  }
}
