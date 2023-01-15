import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { UserEntity } from 'src/modules/user/entities/user.entity'
import { UserService } from 'src/modules/user/user.service'
import { RedisCacheService } from 'src/modules/redis/redis-cache.service'
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisCacheService: RedisCacheService,
  ) { }

  /**
   * 生成token
   * @param user
   */
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user)
  }

  /**
  * 登录
  * @param user
  */
  async login(user: Partial<UserEntity>) {
    const data = await this.userService.login(user)
    const token = this.createToken({
      id: data.id,
      username: data.username,
      role: data.role,
    })
    await this.redisCacheService.cacheSet(
           `${data.id}&${data.username}&${data.role}`,
           token,
           1800,
    )
    return Object.assign(data, { token })
  }

  async getUser(user: { id: string }) {
    return await this.userService.findOne(user.id)
  }

  async checkAdmin() {
    return true
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000
  }
}
