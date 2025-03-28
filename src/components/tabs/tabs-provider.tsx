'use client'

import { createContext, MouseEvent, useContext, useState } from 'react'

interface TabsContextType {
  selectedTab: string
  // eslint-disable-next-line no-unused-vars
  handleTabChange: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, tab: string) => void
}

const TabsContext = createContext<TabsContextType>({
  selectedTab: '',
  handleTabChange: () => {}
})

export const useTabs = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs must be used within TabsProvider')
  }

  return context
}

interface TabsProviderProps {
  children: React.ReactNode
  defaultValue: string
}

const TabsProvider = ({ children, defaultValue = '' }: TabsProviderProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultValue)

  const handleTabChange = (_: any, tab: string) => {
    setSelectedTab(tab)
  }

  return <TabsContext.Provider value={{ selectedTab, handleTabChange }}>{children}</TabsContext.Provider>
}

export default TabsProvider
