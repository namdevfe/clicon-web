'use client'
import Loading from '@/components/loading'
import { cn } from '@/lib/cn'
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-base leading-[3.5rem] tracking-normal font-bold text-nowrap whitespace-nowrap uppercase transition-colors duration-300',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        warning: 'bg-warning-500 text-gray-900 hover:bg-warning-400',
        danger: 'bg-danger-500 text-white hover:bg-danger-600'
      },
      size: {
        large: 'min-w-[117px] h-[56px] px-8 rounded-[3px] gap-3',
        medium: 'min-w-[94px] h-12 px-6 rounded-sm text-sm leading-[3rem] gap-2',
        small: 'min-w-fit h-9 px-4 text-xs leading-[1.25rem] tracking-normal gap-1'
      },
      outlined: {
        'primary-dark':
          'bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-600',
        'primary-light':
          'bg-white border-2 border-primary-100 text-primary-500 hover:bg-white hover:text-primary-500 hover:border-primary-500'
      },
      disabled: {
        false: null,
        true: 'cursor-not-allowed pointer-events-none'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'large'
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: true,
        class: 'bg-primary-200'
      },
      {
        disabled: true,
        outlined: 'primary-dark',
        class: 'bg-white border-primary-200 text-primary-200'
      },
      {
        disabled: true,
        outlined: 'primary-light',
        class: 'bg-white border-primary-200 text-primary-200'
      },
      {
        variant: 'warning',
        disabled: true,
        class: 'bg-warning-200 text-white'
      },
      {
        variant: 'danger',
        disabled: true,
        class: 'bg-danger-200'
      }
    ]
  }
)

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
  isLoading?: boolean
}

const Button = ({
  children,
  className = '',
  variant,
  size,
  disabled,
  outlined,
  beforeIcon,
  afterIcon,
  isLoading = false,
  onClick,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled, outlined, className }), {})}
      onClick={(e) => (!!disabled ? () => {} : onClick?.(e))}
      disabled={disabled || undefined}
      {...restProps}
    >
      {isLoading && <Loading isLoading={isLoading} />}
      {beforeIcon && <span>{beforeIcon}</span>}
      {children}
      {afterIcon && <span>{afterIcon}</span>}
    </button>
  )
}

export default Button
