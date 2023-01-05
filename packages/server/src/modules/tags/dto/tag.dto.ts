import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import type { TagEntity } from '../entities/tag.entity'

export class CreateTagDto {
  @ApiProperty({ description: '标签名称' })
  @IsNotEmpty({ message: '标签不能为空' })
  name: string
}

export interface TagsRo {
  list: TagEntity[]
  total: number
  pageNum: number
  pageSize: number
}
