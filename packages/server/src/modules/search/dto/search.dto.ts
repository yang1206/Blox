import { ApiProperty } from '@nestjs/swagger'
import type { SearchEntity } from '../entities/search.entity'

export class SearchRo {
  @ApiProperty()
  list: SearchEntity[]

  @ApiProperty()
  total: number

  @ApiProperty()
  pageNumber: number

  @ApiProperty()
  pageSize: number

  @ApiProperty()
  pages: number
}
