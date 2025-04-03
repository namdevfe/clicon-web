import { cn } from '@/lib/cn'

interface CardProps {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
}

const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={cn('border border-gray-100 bg-white rounded overflow-hidden', className)}>
      {/* Title */}
      <div className='py-4 px-6 border-b border-gray-100 text-label3 text-gray-900 uppercase'>{title}</div>

      {/* Content */}
      <div className='p-6'>{children}</div>
    </div>
  )
}

export default Card
