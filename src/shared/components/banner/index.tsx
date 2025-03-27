import { cn } from '@/shared/lib/cn'

interface BannerProps {
  className?: string
  children: React.ReactNode
}

const Banner = ({ children, className = '' }: BannerProps) => {
  return (
    <div className={cn('flex flex-col justify-between gap-6 w-full h-fit p-8 rounded overflow-hidden', className)}>
      {children}
    </div>
  )
}

export default Banner
