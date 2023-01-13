import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('picture')
export class PictureEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  // 图片路径
  @Column('text')
  src: string

  // 文件名称
  @Column('text')
  name: string
}
