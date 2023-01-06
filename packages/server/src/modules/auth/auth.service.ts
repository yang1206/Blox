import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { UserEntity } from 'src/modules/user/entities/user.entity'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user)
  }

  async login(user: Partial<UserEntity>) {
    const data = await this.userService.login(user)
    const token = this.createToken({
      id: data.id,
      username: data.username,
      role: data.role,
    })

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