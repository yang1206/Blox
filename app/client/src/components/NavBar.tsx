'use client'
import Link from 'next/link'
import React from 'react'
import { cedarville_cursive } from 'src/fonts/fonts'
import DarkToggle from './DarkToggle'

const routes: { icon?: string; path: string; text?: string }[] = [
  // { icon: 'i-carbon-blog', path: '/posts', text: 'Blog' },
  { icon: 'i-carbon-blog', path: '/posts' },
  { icon: 'i-carbon-delivery-parcel', path: '/projects' },
  // { icon: 'i-carbon:bookmark', path: '/bookmark' },
  // { icon: 'i-carbon-notebook', path: '/notes' },
]
export default function NavBar() {
  return (
    <>
      <header className="b='b-0 dashed gray-300 dark:b-gray-500' fixed inset-x-0 top-0 z-9999 fbc px-8 backdrop-blur trans">
        <Link href="/" title="Yang1206" className={`${cedarville_cursive.className} text-5 dark:text-#d5d5d5`}>
          Yang1206
        </Link>
        <nav style={{ gridTemplateColumns: 'auto max-content' }} className="grid h-16 w-full md:h-18">
          <div />
          <div className="grid auto-flow-col items-center gap-5">
            {
              routes.map((route) => {
                return (
                  <Link key={route.path} href={route.path} title={route.path.slice(1, 2).toUpperCase() + route.path.slice(2).toLowerCase()}>
                    {
                      route.text ? <span className="icon-text">{route.text}</span> : <div className={`${route.icon}  icon-btn`} />
                    }
                  </Link>
                )
              })
            }
            {/* <a
              title="Twitter"
              href="https://twitter.com/chris_zyyv"
              className='hidden
              lg:block
              target="_blank"
              icon-link
              i-ri:twitter-line' rel="noreferrer"
            /> */}
            <a title="Github" href="https://github.com/yang1206" target="_blank" className="i-line-md:github-loop icon-link" rel="noreferrer" />
            <div className="fcc">
              <DarkToggle />
            </div>
          </div>
        </nav>
      </header>
      <div className="h-16 md:h-18" />
    </>
  )
}
