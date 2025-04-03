'use client'

import { cn } from '@/lib/cn'
import { CaretRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export type SidebarItemType = {
  id: string
  icon?: React.ReactNode
  title: string
  href?: string
  child?: SidebarItemType[]
}

interface SidebarItemProps {
  data: SidebarItemType
  className?: string
}

const SidebarItem = ({ data, className = '' }: SidebarItemProps) => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState<boolean>(false)
  const { href, icon, title, child = [] } = data || {}
  const isParent = child.length > 0

  return (
    <li>
      <Link
        href={href || ''}
        className={cn(
          'flex items-center justify-center sm:justify-between text-body-small-400 text-gray-600 py-[10px] px-6 transition-colors duration-300 hover:text-gray-900 hover:bg-gray-50',
          {
            'bg-primary-500 text-white hover:text-white hover:bg-primary-500': isActive || (!!href && href === pathname)
          },
          className
        )}
        onClick={(e) => {
          if (isParent) {
            e.preventDefault()
            setIsActive((prev) => !prev)
          }
        }}
      >
        <div className='flex items-center gap-3'>
          {icon && <span>{icon}</span>}
          <span className='hidden sm:block'>{title}</span>
        </div>
        {isParent && (
          <CaretRight
            size={12}
            className={cn('transition-transform duration-300 will-change-auto', {
              'rotate-90': isActive
            })}
          />
        )}
      </Link>

      {child.length > 0 && isActive && (
        <ul className='flex flex-col'>
          {child.map((childItem) => (
            <SidebarItem
              key={childItem.id}
              data={childItem}
              className={cn({
                'text-primary-500 bg-white hover:text-primary-500 hover:bg-white':
                  isActive && childItem.href === pathname
              })}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default SidebarItem
