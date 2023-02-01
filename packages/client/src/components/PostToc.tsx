'use client'
import React from 'react'

export default function PostToc(props: { toc: Array<{ text: string; level: number }> }) {
  const { toc } = props
  const scrollToAnchor = (anchorname: any) => {
    if (anchorname) {
      const anchorElement = document.getElementById(anchorname)
      if (anchorElement)
        anchorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  return (
    <div className='fixed z-99 top-100px right-20 text-sm hidden xl-block list-none'>
      <ul className='list-none'>
        {/* <li>On this page</li> */}
        {
          toc && toc.map((item, index) => {
            return (
                <li key={index} onClick={() => scrollToAnchor(`#${item.text}`)}>
                 <a className='op-60 hover-op-100 no-underline' href={`#${item.text}`} >{item.text}</a>
                </li>
            )
          },
          )
        }
      </ul>
    </div>
  )
}
