'use client'
import React, { useRef } from 'react'

export default function PostToc(props: { toc: Array<{ text: string; level: number }> }) {
  const { toc } = props
  const tocRef = useRef<HTMLUListElement | null>(null)
  const scrollToAnchor = (anchorname: string, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    // event.preventDefault()

    if (anchorname) {
      const anchorElement = document.getElementById(anchorname)
      if (anchorElement)
        anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='fixed z-99 top-100px right-20 text-sm hidden xl-block list-none'>
      <ul ref={tocRef} className='list-none'>
        {
          toc && toc.map((item, index) => {
            if (item.level === 1) {
              return (
                  <li key={index} onClick={e => scrollToAnchor(`#${item.text}`, e)}>
                  <a className='text-16px op-60 hover-op-100 no-underline' href={`#${item.text}`} >{item.text}</a>
                  </li>
              )
            }
            else if (item.level === 2) {
              return (
                <li className='mx-3' key={index} onClick={e => scrollToAnchor(`#${item.text}`, e)}>
                  <a className='op-60 hover-op-100 no-underline' href={`#${item.text}`} >{item.text}</a>
                </li>
              )
            }
            else if (item.level === 3) {
              return (
                <li className='mx-5' key={index} onClick={e => scrollToAnchor(`#${item.text}`, e)}>
                  <a className='op-60 hover-op-100 no-underline' href={`#${item.text}`} >{item.text}</a>
                </li>
              )
            }
            else {
              return (
                <li className='mx-7' key={index} onClick={e => scrollToAnchor(`#${item.text}`, e)}>
                  <a className='op-60 hover-op-100 no-underline' href={`#${item.text}`} >{item.text}</a>
                </li>
              )
            }
          },
          )
        }
      </ul>
    </div>
  )
}
