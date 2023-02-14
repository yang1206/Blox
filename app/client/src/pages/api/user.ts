// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Endpoints } from '@octokit/types'
export type User = Endpoints['GET /user']['response']['data']
export default async function defineEventHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const data = await (await fetch('https://api.github.com/users/yang1206')).json()
  res.status(200).json(data)
}
