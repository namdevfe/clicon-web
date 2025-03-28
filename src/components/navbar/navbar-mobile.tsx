'use client'

import Menu from '@/components/menu'
import { NAVBAR_ITEMS, NAVBAR_MENU_ITEMS } from '@/constants/menu'
import Tabs from '@/components/tabs'
import { cn } from '@/lib/cn'
import { useAppDispatch, useAppSelector } from '@/store'
import { handleCloseNavMobile, selectIsShowNavMobile } from '@/store/reducers/appSlice'
import { X } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'

const NavbarMobile = () => {
  const isShow = useAppSelector(selectIsShowNavMobile)
  const menuListRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  // Handle close when click outside
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (menuListRef.current && !menuListRef.current.contains(e.target as Node) && isShow) {
        if (e.target instanceof HTMLElement && (e.target.closest('.menu-item') || e.target.closest('.btn-back'))) {
          return
        } else {
          dispatch(handleCloseNavMobile())
        }
      }
    }

    document.addEventListener('click', handleOutSideClick)

    return () => document.removeEventListener('click', handleOutSideClick)
  }, [isShow, dispatch])

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = window.innerWidth
      if (clientWidth >= 768 && isShow) {
        dispatch(handleCloseNavMobile())
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch, isShow])

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 z-[102] w-full h-screen invisible pointer-events-none before:absolute before:left-0 before:top-0 before:z-[10] before:content-[""] before:block before:w-full before:h-full before:bg-black before:opacity-0 before:transition-opacity before:duration-300 before:pointer-events-auto before:invisible',
        {
          'visible pointer-events-auto before:opacity-80 before:pointer-events-none before:visible': isShow
        }
      )}
    >
      {/* Menu list */}
      <div
        className={cn(
          'w-[300px] h-full bg-white absolute left-0 top-0 z-20 -translate-x-[300px] transition-all will-change-transform duration-300',
          {
            'translate-x-[0]': isShow
          }
        )}
        ref={menuListRef}
      >
        <div className='py-2 px-4 w-full flex items-center justify-end'>
          <button
            className='p-2 text-gray-500 transition-colors duration-300 hover:text-primary-500'
            onClick={(e) => {
              e.stopPropagation()
              dispatch(handleCloseNavMobile())
            }}
          >
            <X size={24} weight='bold' />
          </button>
        </div>

        <Tabs defaultValue='menu'>
          <Tabs.List>
            <Tabs.Trigger value='menu'>Menu</Tabs.Trigger>
            <Tabs.Trigger value='categories'>categories</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value='menu'>
            <Menu items={NAVBAR_ITEMS} className='pt-4' />
          </Tabs.Content>
          <Tabs.Content value='categories'>
            <Menu items={NAVBAR_MENU_ITEMS} className='pt-4' />
          </Tabs.Content>
        </Tabs>
      </div>
    </nav>
  )
}

export default NavbarMobile
