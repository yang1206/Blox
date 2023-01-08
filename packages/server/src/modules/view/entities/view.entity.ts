import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('view')
export class ViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  ip: string

  @ApiProperty()
  @Column({ type: 'text', default: null })
  userAgent: string

  @ApiProperty()
  @Column({ type: 'text', default: null })
  url: string

  @ApiProperty()
  @Column({ default: 1 })
  count: number // 同一 userAgent ，同一 url 的访问量

  @ApiProperty()
  @Column({ type: 'text', default: null })
  address: string // 访问地址

  @ApiProperty()
  @Column({ type: 'text', default: null })
  browser: string // 访问浏览器

  @ApiProperty()
  @Column({ type: 'text', default: null })
  engine: string // 访问的浏览器内核

  @ApiProperty()
  @Column({ type: 'text', default: null })
  os: string // 访问操作系统

  @ApiProperty()
  @Column({ type: 'text', default: null })
  device: string // 访问设备

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
}
