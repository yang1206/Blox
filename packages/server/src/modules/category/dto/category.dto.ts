import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import type { CategoryEntity } from '../entities/category.entity'

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '请输入分类名称' })
  @IsString()
  name: string
}

export interface CateRo {
  list: CategoryEntity[]
  total: number
  pageNum: number
  pageSize: number
}
