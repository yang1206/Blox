import { ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { StrategyOptions } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { AuthService } from '../auth.service'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('AUTH_SECRET'),
    } as StrategyOptions)
  }

  async validate(payload: UserEntity) {
    const user = await this.authService.getUser(payload)
    if (!user)
      throw new UnauthorizedException('身份验证失败')

    return user
  }
}
