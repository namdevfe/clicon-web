'use client'
import Link from 'next/link'
import { CaretRight, Stack } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'
import { usePathname } from 'next/navigation'
import { MouseEvent, useState } from 'react'

export interface SidebarMenuItem {
  icon: React.ReactNode
  title: string
  href?: string
  isActive?: boolean
  child?: SidebarMenuItem[]
  className?: string
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, item: SidebarMenuItem) => void
}

interface SidebarProps {
  items: SidebarMenuItem[]
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    icon: <Stack size={20} />,
    title: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    icon: <Stack size={20} />,
    title: 'Users',
    href: '/admin/users'
  },
  {
    icon: <Stack size={20} />,
    title: 'Settings',
    href: '/admin/settings',
    child: [
      {
        icon: <Stack size={20} />,
        title: 'Roles',
        href: '/admin/settings/roles'
      },
      {
        icon: <Stack size={20} />,
        title: 'Permissions',
        href: '/admin/settings/permissions'
      }
    ]
  }
]

const Sidebar = ({ items = [] }: SidebarProps) => {
  const pathname = usePathname()
  const [selectMenuItem, setSelectedMenuItem] = useState<string>('')

  const handleMenuItemChange = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, item: SidebarMenuItem) => {
    e.stopPropagation()
    if (selectMenuItem === item.href) {
      setSelectedMenuItem('')
    } else {
      setSelectedMenuItem(item.href as string)
    }
  }

  const renderItem = (): React.ReactNode => {
    return items.map((item, index) => {
      const isParent = item.child && item.child.length > 0

      if (isParent) {
        return (
          <>
            <SidebarMenuItem
              key={new Date().getTime() + index}
              {...item}
              isActive={pathname.startsWith(item.href || '')}
              onClick={handleMenuItemChange}
            />

            {pathname.startsWith(item.href || '') && selectMenuItem === item.href && (
              <ul className='flex flex-col' key={item.href || new Date().getTime() + index}>
                {item.child?.map((childItem, childIndex) => {
                  return (
                    <SidebarMenuItem
                      className={cn('pl-12', {
                        'text-primary-500': pathname.startsWith(childItem.href || '')
                      })}
                      key={childItem.href || new Date().getTime() + childIndex}
                      {...childItem}
                      // isActive={pathname === childItem.href}
                    />
                  )
                })}
              </ul>
            )}
          </>
        )
      }

      return (
        <SidebarMenuItem
          key={new Date().getTime() + index}
          {...item}
          isActive={item.href ? item.href === pathname : false}
          onClick={handleMenuItemChange}
        />
      )
    })
  }

  return <nav>{items.length > 0 && <ul className='flex flex-col py-4'>{renderItem()}</ul>}</nav>
}

const SidebarMenuItem = (props: SidebarMenuItem) => {
  const { icon, title, href, isActive = false, child = [], className = '', onClick } = props
  return (
    <li>
      <Link
        href={href || ''}
        className={cn(
          'flex items-center gap-3 py-[10px] px-6 text-body-small-400 text-gray-600 bg-white transition-colors duration-300 hover:text-gray-900 hover:bg-gray-50',
          {
            'bg-primary-500 text-white hover:bg-primary-500 hover:text-white': isActive
          },
          className
        )}
        onClick={(e) => onClick?.(e, { icon, title, href, child, isActive })}
      >
        <span>{icon}</span>
        <span>{title}</span>

        {child && child.length > 0 && (
          <span>
            <CaretRight
              size={12}
              className={cn('transition-transform duration-300 will-change-transform', {
                'rotate-90': isActive
              })}
            />
          </span>
        )}
      </Link>
    </li>
  )
}

export default Sidebar
