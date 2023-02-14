import { IsOptional, Matches } from 'class-validator'
import { regPositiveOrEmpty } from 'src/utils/regex'

export class SearchDTO {
  /**
   * 第几页
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: 'page 不可小于 0' })
  readonly page?: number

  /**
   * 每页数据条数
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: 'pageSize 不可小于 0' })
  readonly size?: number

  updateTimeStart: string
  updateTimeEnd: string
  createTimeStart: string
  createTimeEnd: string
  [key: string]: unknown
}
