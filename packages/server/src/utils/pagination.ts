/**
 *
 * @param total
 * @param pageSize
 * @param page
 * @returns
 */
export const getPagination = (
  total: number,
  pageSize: number,
  page: number) => {
  const pages = Math.ceil(total / pageSize)
  return {
    total,
    page,
    pageSize,
    pages,
  }
}
export type Pagination = ReturnType<typeof getPagination>