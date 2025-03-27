'use client'

import { useDropdown } from '@/shared/components/dropdown/dropdown-context'
import React from 'react'

interface DropdownTriggerProps {
  children: React.ReactNode
}

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { handleToggleDropdown, onTrigger } = useDropdown()

  return React.cloneElement(children as React.ReactElement, {
    onClick: onTrigger ? onTrigger : handleToggleDropdown
  })
}

export default DropdownTrigger
