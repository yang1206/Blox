'use client'
import '@/style/globals.css'
import '@/style/dank-mono.css'
import '@/style/markdown.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <>
      {children}
    </>
  )
}
