import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/header'
import { Bounce, ToastContainer } from 'react-toastify'
import '@/styles/globals.scss'
import NavbarMobile from '@/components/navbar/navbar-mobile'
import StoreProvider from '@/components/store-provider'

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
      <body className={publicSans.className} suppressHydrationWarning>
        <StoreProvider>
          <NavbarMobile />
          <Header />
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            transition={Bounce}
          />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
