import { cn } from '@/lib/cn'
import { cva, VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'flex items-center justify-center py-[5px] px-[10px] rounded-sm overflow-hidden w-fit h-[26px] text-body-tiny-600 uppercase',
  {
    variants: {
      variant: {
        danger: 'bg-danger-500 text-white',
        warning: 'bg-warning-500 text-gray-900',
        success: 'bg-success-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        gray: 'bg-gray-400 text-white'
      }
    }
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, variant, className = '' }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant, className }))}>{children}</div>
}

export default Badge
