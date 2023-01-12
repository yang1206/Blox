import { ApiProperty } from '@nestjs/swagger'

export class ResponseVo<T> {
  @ApiProperty()
      list: T[]

  @ApiProperty()
      total: number

  @ApiProperty()
      pageNum: number

  @ApiProperty()
      pageSize: number
}
