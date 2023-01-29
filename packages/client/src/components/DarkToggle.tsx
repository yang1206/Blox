'use client'
import React, { useEffect } from 'react'
interface Props {
  setMode: React.Dispatch<React.SetStateAction<string>>
  mode: string
}
export default function DarkToggle(props: Props) {
  const { setMode, mode } = props
  const handleClick = () => {
    setMode((prev: string) => (prev === 'light' ? 'dark' : 'light'))
    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
  }
  useEffect(() => {
    // toggle HTML theme
    if (mode === 'light')
      document.documentElement.classList.remove('dark')
    else
      document.documentElement.classList.add('dark')
  }, [mode])
  return (
    <>
      <button title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="!outline-none icon-btn" onClick={handleClick}>
        <div className="dark:i-akar-icons:moon-fill i-carbon:light-filled" />
      </button>
    </>
  )
}
