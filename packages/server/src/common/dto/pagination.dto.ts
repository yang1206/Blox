import { IsOptional, Matches } from 'class-validator'
import { regPositiveOrEmpty } from 'src/utils/regex'

export class PaginationDTO {
  /**
   * 第几页
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: 'page 不可小于 0' })
  readonly pageNum?: number

  /**
   * 每页数据条数
   */
  @IsOptional()
  @Matches(regPositiveOrEmpty, { message: 'pageSize 不可小于 0' })
  readonly pageSize?: number

  /**
   * 总页数
   */
  pages: number

  /**
   * 总条数
   */
  total: number
}