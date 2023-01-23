import { SearchQuery, resData } from './common'

export interface postsParams extends Partial<SearchQuery> {
  status?: 'draft' | 'publish' | ''
  tag?: number
  category?: number
  title?: string
  publishTimeStart?: string
  publishTimeEnd?: string
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
  [x: string]: unknown
}
export interface postsData extends resData {
  list: postInfo[]
}

export interface cateInfo {
  id: number
  createTime: Date
  updateTime: Date
  name: string
  postsCount: number
  label: string
}
export interface categoryData extends resData {
  list: cateInfo[]
}
