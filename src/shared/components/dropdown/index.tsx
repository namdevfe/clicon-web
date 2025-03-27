'use client'

import DropdownContent from '@/shared/components/dropdown/dropdown-content'
import DropdownProvider, { DropdownContextType } from '@/shared/components/dropdown/dropdown-context'
import DropdownTrigger from '@/shared/components/dropdown/dropdown-trigger'
import { Position } from '@/types/global'
import { useEffect, useRef, useState } from 'react'

interface DropdownProps {
  children: React.ReactNode
  position?: Position
  isOpen?: boolean
  onTrigger?: () => void
  onClose?: () => void
}

export type Coord = Pick<DOMRect, 'width' | 'height' | 'left' | 'right' | 'top' | 'bottom' | 'x' | 'y'>

const Dropdown = ({ children, position = 'left', isOpen, onTrigger, onClose }: DropdownProps) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false)
  const [coord, setCoord] = useState<Coord | undefined>()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

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

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (dropdownRef.current) {
        const clientRect = dropdownRef.current.getBoundingClientRect()
        setCoord(clientRect)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <DropdownProvider value={value}>
      <div
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
