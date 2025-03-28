import TabsTrigger from './tabs-trigger'
import TabsList from './tabs-list'
import TabsProvider from './tabs-provider'
import TabsContent from './tabs-content'
import { cn } from '@/lib/cn'

interface TabsProps {
  children: React.ReactNode
  defaultValue: string
  className?: string
}

const Tabs = ({ children, defaultValue = '', className = '' }: TabsProps) => {
  return (
    <TabsProvider defaultValue={defaultValue}>
      <div className={cn(className)}>{children}</div>
    </TabsProvider>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
