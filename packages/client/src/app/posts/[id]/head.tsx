import DefaultTags from '@/components/DefaultTags'
import type { postInfo } from '@/types/posts'
const fetchPost = async (id: string) => {
  const res = await fetch(`${process.env.SERVER_API_URL}/posts/${id}`)
  const post: { data: postInfo } = await res.json()
  return post.data
}
export default async function Head({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id)
  return (
    <>
      <DefaultTags />
      <title>{`${post ? post.title : 'not found'} | Yang1206`}</title>
    </>
  )
}
