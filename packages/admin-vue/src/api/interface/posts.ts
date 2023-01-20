import { SearchQuery, resData } from './common'

export interface postsParams extends SearchQuery {
  status: 'draft' | 'publish'
}

export interface postInfo {
  id: string
  title: string
  content: string
  contentHtml: string
  toc: string
  summary: string
  coverUrl: string
  views: number
  likeCount: number
  isRecommend: boolean
  status: 'draft' | 'publish'
  author: string
  category: string
  tags: string[]
  publishTime: Date
  createTime: Date
  updateTime: Date
}
export interface postsData extends resData {
  list: postInfo[]
}
