'use client'

import { Coord } from '@/shared/components/dropdown'
import { Position } from '@/types/global'
import { createContext, ProviderProps, useContext } from 'react'

export interface DropdownContextType {
  isShowDropdown: boolean
  isOpen?: boolean // isOpen is controlled by outside components if have
  coord: Coord | undefined
  position?: Position
  handleToggleDropdown: () => void
  handleShowDropdown: () => void
  handleCloseDropdown: () => void
  onTrigger?: () => void
}

export const DropdownContext = createContext<DropdownContextType>({
  isShowDropdown: false,
  isOpen: undefined,
  coord: undefined,
  position: 'left',
  handleToggleDropdown: () => {},
  handleShowDropdown: () => {},
  handleCloseDropdown: () => {},
  onTrigger: () => {}
})

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within DropdownProvider')
  }
  return context
}

const DropdownProvider = ({ children, ...restProps }: ProviderProps<DropdownContextType>) => {
  return <DropdownContext.Provider {...restProps}>{children}</DropdownContext.Provider>
}

export default DropdownProvider
