import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="prose ma py-30px opacity-50">
        <span className="text-sm font-mono m-20">
          <Link target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA</Link> 2023-PRESENT © YANG1206</span>
        <div className="flex-auto" />
      </div>
    </>
  )
}
