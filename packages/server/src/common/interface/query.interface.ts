export interface SearchQuery {
  page: number
  size: number
  updateTimeStart: string
  updateTimeEnd: string
  [key: string]: unknown
}
