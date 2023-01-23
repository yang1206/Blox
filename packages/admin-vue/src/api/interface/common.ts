export interface SearchQuery {
  page: number
  size: number
  updateTimeStart?: number | string
  updateTimeEnd?: number | string
}

export interface resData {
  total: number
  pageNumber: number
  pageSize: number
}
