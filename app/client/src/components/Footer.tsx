import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="w-full mt-10 mb-6 prose m-auto  opacity-50 flex">
      <span className="text-sm font-mono">
        <Link target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA</Link> 2023-PRESENT © YANG1206</span>
      <div className="flex-auto" />
    </div>
  )
}
