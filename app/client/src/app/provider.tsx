'use client'
import '@unocss/reset/tailwind.css'
import '@/style/globals.css'
import '@/style/markdown.css'
import '@/style/dank-mono.css'
import { ThemeProvider } from 'next-themes'

export default function Provider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider enableSystem attribute="class" storageKey="theme" defaultTheme="system">
      {children}
   </ThemeProvider>
  )
}
