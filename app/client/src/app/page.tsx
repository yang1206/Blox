import Image from 'next/image'
import type { Endpoints } from '@octokit/types'

export type User = Endpoints['GET /user']['response']['data']
async function fetchUser() {
  const res = await fetch('https://api.github.com/users/yang1206')
  const userinfo: User = await res.json()
  return userinfo
}
export default async function Home() {
  const user = await fetchUser()
  return (
    <div className="slide-up-content origin ma font-mono prose">
      <div className='md="gap-10 flex-row" flex flex-col items-center'>
        <Image src={user.avatar_url} alt={user.login as string} width={50} height={50}></Image>
        <div>
          <h2 className='md="justify-start" fic justify-center'>
            {user?.login}
          </h2>
          <p className='md="text-left" text-center text-lg'>
            {user?.bio}
          </p>
          <div className='md="justify-start" fic justify-center gap-4'>
            <div className="fic gap-2">
              <div className="i-carbon-building text-3.5" />
              {user?.company}
            </div>
            <div className="fic gap-2">
              <div className="text-3.5 i-carbon-location" />
              {user?.location}
            </div>
            <div className="fic gap-2">
              <div className="text-3.5 i-carbon-campsite" />
              {user?.blog}
            </div>
          </div>
          <div className='md="justify-start" fic justify-center my-4'>
            <div className="i-carbon-user-favorite-alt-filled mr2" />
            <span>
              {user?.followers}
              <span className="text-xs">
                followers
              </span>
            </span>
            <span className="mx-2">·</span>
            <span>
              {user?.following}
              <span className="text-xs">
                following
              </span>
            </span>
          </div>
          <p />
        </div>
      </div>
    </div>
  )
}
