'use client'

import { cn } from '@/shared/lib/cn'
import { useTabs } from './tabs-provider'

interface TableContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

const TabsContent = ({ children, value = '', className = '' }: TableContentProps) => {
  const { selectedTab } = useTabs()
  const isActive = selectedTab === value

  return isActive && <div className={cn(className)}>{children}</div>
}

export default TabsContent
