import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { postsData } from 'src/types/posts'

export const metadata = {
  title: 'Posts',
}

async function fetchPosts() {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts`)
  const posts: { data: postsData } = await res.json()
  return posts.data.list
}
async function Posts() {
  const posts = await fetchPosts()
  if (!posts)
    notFound()

  return (
    <div className="origin ma prose slide-up">
      {/* <PageHeader title="Posts" description="Some boring but useful articles." /> */}
      {posts.map(post => (
        <>
          <Link href={`posts/${post.id}`} key={post.id} className="block op-70 important-no-underline hover:op-100">
            <h3 className="text-lg md-text-xl">{post.title}</h3>
          </Link>
          <div
            className="fic font-mono text-sm fw-normal italic text-gray4"
          >
            {new Date(post.publishTime).toDateString()}
          </div>
        </>
      ))}
    </div>
  )
}

export default Posts
