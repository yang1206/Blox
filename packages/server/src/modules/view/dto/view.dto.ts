import { ApiProperty } from '@nestjs/swagger'
import type { ViewEntity } from '../entities/view.entity'

export class ViewRo {
  @ApiProperty()
  list: ViewEntity[]

  @ApiProperty()
  total: number

  @ApiProperty()
  pageNumber: number

  @ApiProperty()
  pageSize: number

  @ApiProperty()
  pages: number
}
