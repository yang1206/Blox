'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAutoAnimate } from '@formkit/auto-animate/react'
export default function DarkToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  useEffect(() => {
    setMounted(true)
  }, [])
  const handleClick = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  if (!mounted)
    return null

  return (
    <>
      <button title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="!outline-none icon-btn" onClick={handleClick}>
        <div ref={parent} onClick={() => enableAnimations(false)} className="dark:i-line-md:moon-alt-loop i-line-md:moon-alt-to-sunny-outline-loop-transition" />
      </button>
    </>
  )
}
