'use client'

import { useDropdown } from '@/shared/components/dropdown/dropdown-context'
import { cn } from '@/shared/lib/cn'
import { createPortal } from 'react-dom'

interface DropdownContentProps {
  children: React.ReactNode
  className?: string
}

const DropdownContent = ({ children, className = '' }: DropdownContentProps) => {
  const { isShowDropdown, isOpen, coord, position } = useDropdown()

  if (typeof document === 'undefined') return null

  if (typeof isOpen !== 'undefined' && isOpen) {
    return createPortal(
      <div
        style={{
          top: Number(coord?.top) + Number(coord?.height) + 8 || 0,
          left: position === 'right' ? Number(coord?.x) + Number(coord?.width) : Number(coord?.x) || 0
        }}
        className={cn(
          'absolute top-full z-10 min-w-[180px] bg-white rounded-[3px] shadow-md',
          {
            '-translate-x-full': position === 'right'
          },
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>,
      document.body
    )
  }

  return (
    isShowDropdown &&
    createPortal(
      <div
        style={{
          top: Number(coord?.top) + Number(coord?.height) + 8 || 0,
          left: position === 'right' ? Number(coord?.x) + Number(coord?.width) : Number(coord?.x) || 0
        }}
        className={cn('absolute top-full z-10 min-w-[180px] bg-white rounded-[3px] shadow-md', className, {
          '-translate-x-full': position === 'right'
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>,
      document.body
    )
  )
}

export default DropdownContent
