import Image from 'next/image'
import type { Endpoints } from '@octokit/types'
export type User = Endpoints['GET /user']['response']['data']
const fetchUser = async () => {
  const res = await fetch('https://api.github.com/users/yang1206')
  const userinfo: User = await res.json()
  return userinfo
}
export default async function Home() {
  const user = await fetchUser()
  return (
    <div className="prose font-mono ma origin">
      <div className='flex flex-col items-center md="gap-10 flex-row"'>
        <Image src={user.avatar_url} alt={user.name as string} width={50} height={50}></Image>
        <div>
          <h2 className='fic justify-center md="justify-start"'>
            {user?.login}
          </h2>
          <p className='text-lg text-center md="text-left"'>
            {user?.bio}
          </p>
          <div className='fic gap-4 justify-center md="justify-start"'>
            <div className='fic gap-2'>
              <div className="text-3.5 i-carbon-building" />
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
          <div className='my-4 fic justify-center md="justify-start"'>
            <div className="i-carbon-user-favorite-alt-filled mr2" />
            <span>
              {user?.followers}
              <span className="text-xs">
                followers
              </span>
            </span>
            <span className='mx-2'>·</span>
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
