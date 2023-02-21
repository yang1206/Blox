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
           3600,
    )
    await this.redisCacheService.set(
      `_refresh_token${data.id}&${data.username}&${data.role}`,
      refresh_token,
      604800,
    )
    return Object.assign(data, { token: access_token, refreshToken: refresh_token })
  }

  async getUser(user: { id: string }) {
    return await this.userService.findOne(user.id)
  }

  /**
   * 刷新token
   * @param userId
   * @param rt
   */
  async refreshToken(refreshData: RefreshDto) {
    const user = await this.getUser({ id: refreshData.id })

    const refresh_cache_token = await this.redisCacheService.get(`_refresh_token${user.id}&${user.username}&${user.role}`)

    if (!user || !refreshData.refresh_token)
      throw new ForbiddenException('Access Denied')
      // 比对传来的刷新token与缓存中的是否一致
    if (refresh_cache_token !== refreshData.refresh_token)
      throw new ForbiddenException()

    const tokens = await this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })
    this.redisCacheService.set(
           `${user.id}&${user.username}&${user.role}`,
           tokens.access_token,
           3600)
    this.redisCacheService.set(
      `_refresh_token${user.id}&${user.username}&${user.role}`,
      tokens.refresh_token,
      604800)
    return tokens
  }
}
