import { SearchQuery, resData } from './common'

export interface postsParams extends Partial<SearchQuery> {
  status?: 'draft' | 'publish' | ''
  tag?: number
  category?: number
  title?: string
  publishTimeStart?: string
  publishTimeEnd?: string
}

export interface PostInfo {
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
  list: PostInfo[]
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

export interface tagsInfo {
  id: number
  createTime: Date
  updateTime: Date
  name: string
  postsCount: number
  label: string
}
export interface tagsData extends resData {
  list: tagsInfo[]
}
export interface createPosts {
  id?: string
  title: string
  content: string
  summary: string
  contentHtml: string
  coverUrl: string
  toc: any
  status: 'draft' | 'publish' | ''
  category: number
  isRecommend: boolean
  tag: number[]
}

export type onePost = Omit<PostInfo, 'tags'> & { tags: tagsInfo[]; category: cateInfo }
