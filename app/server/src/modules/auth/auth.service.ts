import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { UserEntity } from 'src/modules/user/entities/user.entity'
import { UserService } from 'src/modules/user/user.service'
import { RedisCacheService } from 'src/core/cache/redis.service'
import { ConfigService } from '@nestjs/config'
import type { RefreshDto } from './dto/login.dto'
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisCacheService: RedisCacheService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * 生成token
   * @param user
   */
  async createToken(user: Partial<UserEntity>) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        user,
        {
          secret: this.configService.get('AUTH_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        user,
        {
          expiresIn: '7d',
          secret: this.configService.get('RT_AUTH_SECRET'),
        },
      ),
    ])

    return {
      access_token,
      refresh_token,
    }
  }

  /**
  * 登录
  * @param user
  */
  async login(user: Partial<UserEntity>) {
    const data = await this.userService.login(user)
    const { access_token, refresh_token } = await this.createToken({
      id: data.id,
      username: data.username,
      role: data.role,
    })
    await this.redisCacheService.set(
           `${data.id}&${data.username}&${data.role}`,
           access_token,
           1800,
    )
    return Object.assign(data, { token: access_token, refreshToken: refresh_token })
  }

  async getUser(user: { id: string }) {
    return await this.userService.findOne(user.id)
  }

  // TODO 刷新token优化
  /**
   * 刷新token
   * @param userId
   * @param rt
   */
  async refreshToken(refreshData: RefreshDto) {
    const user = await this.getUser({ id: refreshData.id })
    if (!user || !refreshData.refresh_token)
      throw new ForbiddenException('Access Denied')
    const tokens = await this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })
    this.redisCacheService.set(
           `${user.id}&${user.username}&${user.role}`,
           tokens.access_token,
           3600)
    return tokens
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000
  }
}