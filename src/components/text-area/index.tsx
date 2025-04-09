'use client'

import { cn } from '@/lib/cn'
import { Checks, Warning } from '@phosphor-icons/react'
import React from 'react'
import { Control, useController } from 'react-hook-form'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  control: Control<any>
}

const TextArea = ({ name, control, disabled = false, ...restProps }: TextAreaProps) => {
  const {
    field,
    fieldState: { error, isDirty }
  } = useController({ name, control })

  return (
    <div
      className={cn(
        'relative w-full rounded-sm bg-white border border-solid border-gray-100 transition-colors duration-300 focus-within:border-primary-500',
        {
          'border-danger-500 focus-within:border-danger-500': error?.message,
          'border-success-500 focus-within:border-success-500': isDirty && !error?.message,
          'cursor-not-allowed pointer-events-none opacity-50': disabled
        }
      )}
    >
      <textarea
        className={cn(
          'w-full h-full py-3 pl-4 pr-11 outline-none placeholder:text-gray-500 placeholder:transition-colors placeholder:duration-300 focus-within:placeholder:text-gray-300',
          {
            'bg-danger-50': error?.message,
            'bg-success-50': isDirty && !error?.message
          }
        )}
        {...field}
        {...restProps}
      />

      {error?.message && (
        <Warning size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-danger-500' />
      )}

      {/* Success */}
      {isDirty && !error?.message && (
        <Checks size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-success-500' />
      )}
    </div>
  )
}

export default TextArea
