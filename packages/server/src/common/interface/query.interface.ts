export interface SearchQuery {
  page: number
  size: number
  updateTimeStart: string
  updateTimeEnd: string
  createTimeStart: string
  createTimeEnd: string
  [key: string]: unknown
}
