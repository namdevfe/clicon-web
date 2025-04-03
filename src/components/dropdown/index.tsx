'use client'

import { useRectResize } from '@/hooks'
import DropdownContent from '@/components/dropdown/dropdown-content'
import DropdownProvider, { DropdownContextType } from '@/components/dropdown/dropdown-context'
import DropdownTrigger from '@/components/dropdown/dropdown-trigger'
import { Position } from '@/types/global'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface DropdownProps {
  children: React.ReactNode
  position?: Position
  isOpen?: boolean
  className?: string
  onTrigger?: () => void
  onClose?: () => void
}

export type Coord = Pick<DOMRect, 'width' | 'height' | 'left' | 'right' | 'top' | 'bottom' | 'x' | 'y'>

const Dropdown = ({ children, position = 'left', isOpen, className = '', onTrigger, onClose }: DropdownProps) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { coord, setCoord } = useRectResize(dropdownRef)

  const handleToggleDropdown = () => {
    setIsShowDropdown((prev) => !prev)
  }

  const handleShowDropdown = () => {
    setIsShowDropdown(true)
  }

  const handleCloseDropdown = () => {
    setIsShowDropdown(false)
  }

  const value: DropdownContextType = {
    isShowDropdown,
    isOpen,
    coord,
    position,
    handleToggleDropdown,
    handleShowDropdown,
    handleCloseDropdown,
    onTrigger
  }

  // Handle click outside
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (onClose) {
          onClose()
        } else {
          handleCloseDropdown()
        }
      }
    }

    document.addEventListener('click', handleOutSideClick)

    return () => {
      document.removeEventListener('click', handleOutSideClick)
    }
  }, [onClose])

  return (
    <DropdownProvider value={value}>
      <div
        className={cn(className)}
        ref={dropdownRef}
        onClick={() => {
          const currentCoord = dropdownRef.current?.getBoundingClientRect()
          setCoord(currentCoord)
        }}
      >
        {children}
      </div>
    </DropdownProvider>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent

export default Dropdown
