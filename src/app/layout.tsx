import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'

const publicSans = localFont({
  src: [
    {
      path: './fonts/PublicSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/PublicSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/PublicSans-Bold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/PublicSans-SemiBold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'Clicon',
  description: 'This website is developed by Namdev'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={publicSans.className}>{children}</body>
    </html>
  )
}
