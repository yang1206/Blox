import React from 'react'
import { notFound } from 'next/navigation'
import type { postInfo } from 'src/types/posts'
import { LocalDate } from 'src/utils'
import MarkdownView from 'src/components/MdView'
import PostToc from 'src/components/PostToc'

async function fetchPost(id: string) {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/${id}`)
  const post: { data: postInfo } = await res.json()
  return post.data
}
export async function generateMetadata(props: { params: { id: string } }) {
  const post = await fetchPost(props.params.id)
  return { title: post.title }
}
async function PostsInfo(props: { params: { id: string } }) {
  const post = await fetchPost(props.params.id)
  if (!post)
    notFound()

  return (
    <>
      <article className="prose font-mono ma">
        <div className="base">
          <h1>{post.title}</h1>
        </div>
        <p className="important-text-op-70">{LocalDate(post.publishTime)}</p>
        <div>
          <MarkdownView textContent={post.content} />
        </div>
        <PostToc toc={JSON.parse(post.toc) as { text: string; level: number }[]} />
      </article>
    </>
  )
}

export default PostsInfo
