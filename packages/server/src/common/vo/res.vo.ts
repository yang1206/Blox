import { ApiProperty } from '@nestjs/swagger'

export class ResponseVo<T> {
  @ApiProperty()
    list: T[]

  @ApiProperty()
    total: number

  @ApiProperty()
    pageNumber: number

  @ApiProperty()
    pageSize: number

  @ApiProperty()
    pages: number
}
