import { BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import type { IStrategyOptions } from 'passport-local'
import { Strategy } from 'passport-local'
import { UserEntity } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { compare } from '@blox/utils'
import { ConfigService } from '@nestjs/config'

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {
    // 因为密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne()

    if (!user)
      throw new BadRequestException('用户名不正确！')

    if (!compare(password, user.password, this.configService.get('AUTH_SECRET')))
      throw new BadRequestException('密码错误！')

    return user
  }
}
