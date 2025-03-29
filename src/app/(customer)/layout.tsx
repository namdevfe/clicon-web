'use client'
import Header from '@/components/header'
import NavbarMobile from '@/components/navbar/navbar-mobile'
import { cn } from '@/lib/cn'
import { useAppSelector } from '@/store'
import { selectIsShowDiscount } from '@/store/reducers/appSlice'
import { Suspense } from 'react'

interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const isShowDiscount = useAppSelector(selectIsShowDiscount)

  return (
    <div
      className={cn('pt-[220px]', {
        'pt-[300px]': isShowDiscount
      })}
    >
      <NavbarMobile />
      <Header />
      <Suspense>{children}</Suspense>
    </div>
  )
}

export default PublicLayout
