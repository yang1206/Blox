import { ApiProperty } from '@nestjs/swagger'
import type { ViewEntity } from '../entities/view.entity'

export class ViewRo {
  @ApiProperty()
  list: ViewEntity[]

  @ApiProperty()
  total: number

  @ApiProperty()
  pageNum: number

  @ApiProperty()
  pageSize: number
}
