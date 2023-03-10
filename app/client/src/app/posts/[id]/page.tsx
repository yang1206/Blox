import React from 'react'
import { notFound } from 'next/navigation'
import type { postInfo } from '@/types/posts'
import { LocalDate } from '@/utils'
import MarkdownView from '@/components/MdView'
import PostToc from '@/components/PostToc'

const fetchPost = async (id: string) => {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/${id}`)
  const post: { data: postInfo } = await res.json()
  return post.data
}
export async function generateMetadata(props: { params: { id: string } }) {
  const post = await fetchPost(props.params.id)
  return { title: post.title }
}
const PostsInfo = async (props: { params: { id: string } }) => {
  const post = await fetchPost(props.params.id)
  if (!post)
    notFound()

  return (
    <>
      <article className='prose font-mono ma'>
        <div className='base'>
          <h1>{post.title}</h1>
        </div>
        <p className='important-text-op-70'>{LocalDate(post.publishTime)}</p>
        <div>
          <MarkdownView textContent={post.content} />
        </div>
        <PostToc toc={JSON.parse(post.toc) as { text: string; level: number }[]} />
      </article>
    </>
  )
}

export default PostsInfo
