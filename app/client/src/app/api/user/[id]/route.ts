import type { Endpoints } from '@octokit/types'
export type User = Endpoints['GET /user']['response']['data']

export async function GET(request: Request, props: { params: { id: string } }) {
  const id = props.params.id
  const data = (await fetch(`https://api.github.com/users/${id || 'yang1206'}`))
  const user = await data.json()
  return new Response(user, {
    status: 200,
  })
}
