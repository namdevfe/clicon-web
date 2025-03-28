import { cn } from '@/lib/cn'

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

const TabsList = ({ children, className = '' }: TabsListProps) => {
  return <div className={cn('flex items-center', className)}>{children}</div>
}

export default TabsList
