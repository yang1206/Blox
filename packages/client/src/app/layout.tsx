'use client'
import { inter } from '@/fonts/fonts'
import NavBar from '@/components/NavBar'
import Provider from '@/app/provider'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.className}>
      <body>
        <Provider>
            <NavBar />
            <main className='px-7 pt-10 pb-18'>
              {children}
            </main>
            <Footer />
        </Provider>
      </body>
    </html>
  )
}