import { categoryData, createPosts, onePost, postsData, postsParams, tagsData } from '../interface/posts'
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
 * 获取单个文章数据
 * @param data
 * @returns
 */
export const getPostById = (id: string) => {
  return request<{ id: string }, onePost>({
    url: `/posts/${id}`,
    method: 'GET',
  })
}
/**
 * 新增文章
 * @param data
 * @returns
 */
export const cratePost = (data: Partial<createPosts>) => {
  return request<Partial<createPosts>, string>({
    url: '/posts',
    method: 'POST',
    data,
  })
}

/**
 * 更新文章
 * @param data
 * @returns
 */
export const updatePost = (id: string, data: Partial<createPosts>) => {
  return request<Partial<createPosts>, string>({
    url: `/posts/${id}`,
    method: 'PATCH',
    data,
  })
}

/**
 * 更新文章
 * @param data
 * @returns
 */
export const deletePost = (id: string) => {
  return request<{ id: string }, string>({
    url: `/posts/${id}`,
    method: 'DELETE',
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

/**
 * 获取文章标签数据
 * @param data
 * @returns
 */
export const tagsRequest = () => {
  return request<any, tagsData>({
    url: '/tags',
    method: 'GET',
  })
}
