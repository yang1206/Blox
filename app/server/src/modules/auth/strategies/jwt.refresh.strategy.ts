import type { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type { StrategyOptions } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Request } from 'express'
import type { UserEntity } from 'src/modules/user/entities/user.entity'
import { ForbiddenException } from '@nestjs/common'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yang1206',
      passReqToCallback: true,
    } as StrategyOptions)
  }

  async validate(req: Request, payload: UserEntity) {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim()
    if (!refreshToken)
      throw new ForbiddenException('Refresh token malformed')

    return {
      ...payload,
      refreshToken,
    }
  }
}
