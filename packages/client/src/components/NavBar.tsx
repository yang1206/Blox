'use client'
import Link from 'next/link'
import React from 'react'
import DarkToggle from './DarkToggle'
import { cedarville_cursive } from '@/fonts/fonts'
const routes: { icon?: string; path: string; text?: string }[] = [
  // { icon: 'i-carbon-blog', path: '/posts', text: 'Blog' },
  { icon: 'i-carbon-blog', path: '/posts' },
  { icon: 'i-carbon-delivery-parcel', path: '/projects' },
  // { icon: 'i-carbon:bookmark', path: '/bookmark' },
  // { icon: 'i-carbon-notebook', path: '/notes' },
]
export default function NavBar() {
  const [mode, setMode] = React.useState('light')

  React.useEffect(() => {
    if (localStorage.getItem('mode'))
      setMode(localStorage.getItem('mode') as string)
  }, [])
  return (
    <>
  <header className="fixed
    z-9999
    top-0
    inset-x-0
    trans
    backdrop-blur
    b='b-0 dashed gray-300 dark:b-gray-500'
    fbc
    px-8">
        <Link href='/' className={`${cedarville_cursive.className} text-5 dark:text-#d5d5d5`}>
          Yang1206
      </Link>
      <nav grid={'~ cols-[auto_max-content]'} className='w-full  h-16 md:h-18>'>
          <div />
          <div className='grid gap-5 auto-flow-col items-center'>
            {
              routes.map((route) => {
                return (
                  <Link key={route.path} href={route.path} title={route.path.slice(1, 2).toUpperCase() + route.path.slice(2).toLowerCase()}>
                    {
                      route.text ? <span className='icon-text'>{route.text}</span> : <div className={`${route.icon}  icon-btn` } />
                    }
                  </Link>
                )
              })
            }
            <a
              title="Twitter"
              href="https://twitter.com/chris_zyyv"
              className='hidden
              lg:block
              target="_blank"
              icon-link
              i-ri:twitter-line' rel="noreferrer"
            />
            <a title="Github" href="https://github.com/yang1206" target="_blank" className='icon-link i-ri-github-line' rel="noreferrer" />
            <div className='fcc'>
              <DarkToggle setMode={setMode} mode={mode} />
            </div>
          </div>
      </nav>
    </header>
      <div className="h-16 md:h-18" />
    </>
  )
}
