import { ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { StrategyOptions } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { RedisCacheService } from 'src/modules/redis/redis-cache.service'
import { AuthService } from '../auth.service'

export class JwtStrategy extends PassportStrategy(Strategy) {
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

  async validate(req, payload: UserEntity) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    const cacheToken = await this.redisCacheService.cacheGet(
           `${payload.id}&${payload.username}&${payload.role}`,
    )

    if (!cacheToken)
      throw new UnauthorizedException('token 已过期')
    if (token !== cacheToken)
      throw new UnauthorizedException('token不正确')

    const existUser = await this.authService.getUser(payload)
    if (!existUser)
      throw new UnauthorizedException('身份验证失败')
    this.redisCacheService.cacheSet(
           `${payload.id}&${payload.username}&${payload.role}`,
           token,
           1800,
    )
    return existUser
  }
}
