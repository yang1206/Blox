import React from 'react'
import type { postInfo } from '@/types/posts'
import { LocalDate } from '@/utils'
import MarkdownView from '@/components/MdView'
import PostToc from '@/components/PostToc'

const fetchPost = async (id: string) => {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/${id}`)
  const post: { data: postInfo } = await res.json()
  return post.data
}
const PostsInfo = async (props: any) => {
  const post = await fetchPost(props.params.id)
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
