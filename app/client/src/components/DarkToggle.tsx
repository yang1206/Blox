'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function DarkToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  const handleClick = (event: any) => {
    const isDark = (theme === 'light')
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      theme === 'light' ? setTheme('dark') : setTheme('light')
      return
    }

    const x = event?.clientX
    const y = event?.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
    })
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: isDark
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }
  if (!mounted)
    return null

  return (
    <>
      <button title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="!outline-none icon-btn" onClick={(e) => { handleClick(e) }}>
        <div className="dark:i-line-md:moon-alt-loop i-line-md:moon-alt-to-sunny-outline-loop-transition" />
      </button>
    </>
  )
}
