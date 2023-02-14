export interface SearchQuery {
  page: number
  size: number
  updateTimeStart: number | string
  updateTimeEnd: number | string
  createTimeStart: number | string
  createTimeEnd: number | string
}

export interface resData {
  total: number
  pageNumber: number
  pageSize: number
}
