'use client'

import { useTabs } from '@/shared/components/tabs/tabs-provider'
import { cn } from '@/shared/lib/cn'

interface TabsTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
}

const TabsTrigger = ({ children, value = '', className = '' }: TabsTriggerProps) => {
  const { selectedTab, handleTabChange } = useTabs()
  return (
    <button
      className={cn(
        'relative h-14 w-full py-[18px] px-5 flex items-center justify-center text-label3 text-gray-600 uppercase transition-colors duration-300 hover:bg-gray-50 hover:text-gray-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:block after:w-full after:h-[3px] after:bg-primary-500 after:transition-transform after:scale-x-0 after:will-change-transform after:origin-right after:duration-300',
        {
          'after:scale-x-100 after:origin-left !text-gray-900': selectedTab === value
        },
        className
      )}
      onClick={(e) => handleTabChange(e, value)}
    >
      {children}
    </button>
  )
}

export default TabsTrigger
