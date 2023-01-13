import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { compare, decrypto, encrypto } from '@my-blog/utils'
import { CommonEntity } from 'src/common/entity/common.entity'
@Entity('user')
export class UserEntity extends CommonEntity {
  /**
     * 检测密码是否一致
     * @param password0 加密前密码
     * @param password1 加密后密码
     */
  static comparePassword(password0: string, password1: string, secret: string) {
    return compare(password0, password1, secret)
  }

  static encryptPassword(password: string, secret: string) {
    return decrypto(password, secret)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  username: string // 用户名

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  nickname: string // 昵称

  @Exclude()
  @Column({ nullable: true })
  password: string // 密码

  // @Exclude()
  // @Column({
  //   type: 'text',
  //   nullable: false,
  // })
  // salt: string // 加密盐

  @ApiProperty()
  @Column({ default: null })
  avatar: string // 头像

  @ApiProperty()
  @Column({ default: null })
  email: string

  @ApiProperty()
  @Column('simple-enum', { enum: ['admin', 'visitor'], default: 'visitor' })
  role: string // 用户角色

  @ApiProperty()
  @Column('simple-enum', { enum: ['locked', 'active'], default: 'active' })
  status: string // 用户状态

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password)
      return
    this.password = encrypto(this.password, process.env.AUTH_SECRET)
  }
}
