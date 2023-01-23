/**
 *
 * @param total 总数
 * @param pageSize 单页数量
 * @param pageNumberber 当前页数
 * @returns
 */
export const getPagination = (
  total: number,
  pageNumber: number,
  pageSize: number) => {
  const pages = Math.ceil(total / pageSize)
  return {
    total,
    pageNumber: +pageNumber,
    pageSize: +pageSize,
    pages,
  }
}
export type Pagination = ReturnType<typeof getPagination>
