import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/common/entity/common.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('file')
export class PictureEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number

  // 图片路径
  @Column('text')
  public url: string

  @ApiProperty({ description: '上传用户id' })
  @Column({ type: 'varchar', name: 'user_id', comment: '上传用户id' })
  public userId: string

  @ApiProperty({ description: '文件size' })
  @Column({ type: 'int', comment: '文件size' })
  public size: number

  @ApiProperty({ description: '文件mimetype类型' })
  @Column({ type: 'varchar', length: 20, comment: '文件mimetype类型' })
  public type: string

  @Column({ type: 'varchar', length: 200, comment: '文件存放位置', select: false })
  public location: string

  // 文件名称
  // @Column('text')
  // public name: string
}
