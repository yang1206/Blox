import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateMenuDto {
  @ApiProperty({ description: '菜单标题' })
  @IsNotEmpty({ message: '菜单名称必填' })
  readonly name: string

  @ApiProperty({ description: '菜单路由' })
  @IsNotEmpty({ message: '菜单路由必填' })
  readonly path: string

  @ApiPropertyOptional({ description: '排序' })
  readonly sort: number

  @ApiPropertyOptional({ description: '文章封面' })
  @IsNotEmpty({ message: '菜单图标必填' })
  readonly icon: string

  @ApiProperty({ description: '是否展示' })
  readonly show: boolean

  @ApiProperty({ description: '是否展示' })
  readonly parent_id: number
}
