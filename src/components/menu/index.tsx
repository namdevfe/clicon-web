'use client'

import { cn } from '@/lib/cn'
import { CaretLeft } from '@phosphor-icons/react'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, useState } from 'react'

export interface MenuItem {
  href?: string
  title: React.ReactNode
  child?: MenuItem[]
}

interface MenuItemProps extends MenuItem {
  isActive?: boolean
  // eslint-disable-next-line no-unused-vars
  onClick: (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => void
}

interface MenuProps {
  items?: MenuItem[]
  className?: string
}

const Menu = ({ items = [], className = '' }: MenuProps) => {
  const pathname = usePathname()
  const [history, setHistory] = useState<{ data: MenuItem[] }[]>([{ data: items }])

  const current = history[history.length - 1]

  const renderItem = () => {
    return current.data.map((item, index: number) => {
      const isParent = (item.child?.length as number) > 0
      const key = new Date().getTime() + index

      return (
        <MenuItem
          key={key}
          {...item}
          isActive={item.href === pathname}
          onClick={(e) => {
            e.stopPropagation()
            if (isParent) {
              setHistory((prev) => [...prev, { data: item?.child || [] }])
            }
          }}
        />
      )
    })
  }

  return (
    items?.length > 0 && (
      <ul className={cn('flex flex-col w-full', className)}>
        {/* Button back */}
        {history.length > 1 && (
          <li className='flex'>
            <button
              className='btn-back flex w-full items-center gap-3 py-[10px] px-6 bg-white text-body-small-400 text-gray-700 transition-colors duration-300 hover:text-gray-900 hover:bg-gray-50'
              onClick={(e) => {
                e.stopPropagation()
                setHistory((prev) => prev.slice(0, prev.length - 1))
              }}
            >
              <CaretLeft size={14} />
              <span>Back</span>
            </button>
          </li>
        )}
        {renderItem()}
      </ul>
    )
  )
}

const MenuItem = ({
  href,
  title,
  child = [],
  isActive = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {}
}: MenuItemProps) => {
  const isParent = child.length > 0

  return (
    <li className='flex menu-item'>
      <Link
        href={href || ''}
        className={cn(
          'flex w-full items-center justify-between py-[10px] px-6 bg-white text-body-small-400 text-gray-700 transition-colors duration-300 hover:text-gray-900 hover:bg-gray-50',
          {
            'bg-primary-500 text-white hover:bg-primary-500 hover:text-white': isActive
          }
        )}
        onClick={onClick}
      >
        <span>{title}</span>
        {isParent && <CaretRight size={12} weight='bold' />}
      </Link>
    </li>
  )
}

export default Menu
