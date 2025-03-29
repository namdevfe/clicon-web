import { cn } from '@/lib/cn'
import { Spinner } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

interface LoadingProps {
  isLoading?: boolean
  size?: number
  className?: string
}

const Loading = ({ isLoading = false, size = 24, className = '' }: LoadingProps) => {
  return (
    <div
      className={cn(className, {
        'animate-spin': isLoading
      })}
    >
      <Spinner size={size} />
    </div>
  )
}

export default Loading
