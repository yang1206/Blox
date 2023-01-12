import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('search')
export class SearchEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  type: string // 搜索类型

  @ApiProperty()
  @Column()
  keyword: string // 搜索关键词

  @ApiProperty()
  @Column({ default: 1 })
  count: number
}
