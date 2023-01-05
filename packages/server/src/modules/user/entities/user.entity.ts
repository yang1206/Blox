import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
@Entity('user')
export class UserEntity {
  /**
     * 检测密码是否一致
     * @param password0 加密前密码
     * @param password1 加密后密码
     */
  static comparePassword(password0, password1) {
    return bcrypt.compareSync(password0, password1)
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10)
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '用户id' })
  id: string

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  username: string // 用户名

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  nickname: string // 昵称

  @ApiProperty()
  @Exclude()
  @Column({ nullable: true })
  password: string // 密码

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

  @ApiProperty()
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date

  @ApiProperty()
  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    comment: '更新时间',
  })
  updateTime: Date

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password)
      return
    this.password = await bcrypt.hashSync(this.password, 10)
  }
}
