'use client'

import Loading from '@/components/loading'
import { cn } from '@/lib/cn'
import { isClient } from '@/lib/http'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  isLoading?: boolean
  classNameInner?: string
  onClose: () => void
}

const Modal = ({
  children,
  isOpen = false,
  isLoading = false,
  classNameInner = '',
  onClose = () => {}
}: ModalProps) => {
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('click', handleOutSideClick)

    return () => document.removeEventListener('click', handleOutSideClick)
  }, [onClose])

  if (document === undefined) {
    return null
  }

  if (isClient) {
    return createPortal(
      <div
        className={cn(
          'fixed top-0 left-0 z-[105] w-full h-screen flex items-center justify-center opacity-0 invisible pointer-events-none transition-all duration-300',
          {
            'opacity-100 pointer-events-auto visible': isOpen
          }
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            'absolute left-0 top-0 w-full h-full bg-gray-800 opacity-0 invisible pointer-events-auto transition-opacity duration-300',
            {
              'opacity-80 pointer-events-none visible': isOpen
            }
          )}
        />

        {/* Inner */}
        <div
          ref={innerRef}
          className={cn(
            'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-6 rounded bg-white overflow-hidden',
            classNameInner
          )}
        >
          {children}
          {isLoading && (
            <div className='absolute left-0 top-0 z-[107] w-full h-full bg-white opacity-60 flex items-center justify-center text-primary-600'>
              <Loading isLoading={isLoading} size={30} />
            </div>
          )}
        </div>
      </div>,
      document.body
    )
  }
}

export default Modal
