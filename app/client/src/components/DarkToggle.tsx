'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
export default function DarkToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
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
        <div className="dark:i-akar-icons:moon-fill i-carbon:light-filled" />
      </button>
    </>
  )
}
