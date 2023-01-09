import { ApiProperty } from '@nestjs/swagger'
import type { SearchEntity } from '../entities/search.entity'

export class SearchRo {
  @ApiProperty()
  list: SearchEntity[]

  @ApiProperty()
  total: number

  @ApiProperty()
  pageNum: number

  @ApiProperty()
  pageSize: number
}
