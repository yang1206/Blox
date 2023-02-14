import { Cedarville_Cursive, Inter, Roboto_Mono } from '@next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'optional',
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'optional',
})

export const cedarville_cursive = Cedarville_Cursive({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-cedarville-cursive',
  weight: ['400'],
})
