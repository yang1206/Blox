import { categoryData, postsData, postsParams } from '../interface/posts'
import request from '@/service'

/**
 * 获取文章数据
 * @param data
 * @returns
 */
export const postsRequest = (data: postsParams) => {
  return request<postsParams, postsData>({
    url: '/posts',
    method: 'GET',
    data,
  })
}

/**
 * 获取文章分类数据
 * @param data
 * @returns
 */
export const categoryRequest = () => {
  return request<any, categoryData>({
    url: '/category',
    method: 'GET',
  })
}
