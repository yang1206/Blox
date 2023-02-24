import type { Metadata } from 'next'
import { inter } from '@/fonts/fonts'
import NavBar from '@/components/NavBar'
import Provider from '@/app/provider'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  icons: {
    shortcut: 'https://nextjs.org/static/favicon/favicon.ico',
    icon: 'https://nextjs.org/static/favicon/favicon-16x16.png',
    apple: [
      { url: 'https://nextjs.org/static/favicon/apple-touch-icon.png' },
      { url: 'https://nextjs.org/static/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://nextjs.org/static/favicon/apple-touch-icon.png',
      },
    ],
  },
  description: 'Yang1206的博客',
  title: {
    default: 'Yang1206',
    template: '%s | Yang1206',
  },
  openGraph: {
    title: 'Yang1206',
    description: 'Yang1206的博客',
    siteName: 'Yang1206',
    url: 'https://yang1206.site',
    locale: 'zh-cn',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: 'tomato',
  authors: [{ name: 'Yang1206' }, { name: 'Yang1206', url: 'https://yang1206.site' }],
  appleWebApp: {
    title: 'Yang1206',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: 'https://nextjs.org/static/favicon/android-chrome-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="scrollbar-hide mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto md:px-3">
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
