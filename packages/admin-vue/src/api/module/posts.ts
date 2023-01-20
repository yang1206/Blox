import { postsData, postsParams } from '../interface/posts'
import request from '@/service'

export const postsRequest = (data: postsParams) => {
  return request<postsParams, postsData>({
    url: '/posts',
    method: 'GET',
    data,
  })
}
