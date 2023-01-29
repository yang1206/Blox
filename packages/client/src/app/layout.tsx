'use client'
import { inter } from '@/fonts/fonts'
import NavBar from '@/components/NavBar'
import Provider from '@/context/Provider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.className}>
      <head />
      <body>
        <Provider>
          <div>
            <NavBar />
            <main className='px-7 pt-10 pb-18'>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
