'use client'

import { cn } from '@/lib/cn'
import { Check } from '@phosphor-icons/react'
import { Control, useController } from 'react-hook-form'
import './checkbox.scss'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelCheckbox?: React.ReactNode
  name: string
  control: Control<any>
}

const Checkbox = ({ labelCheckbox, name, control, disabled = false, ...restProps }: CheckboxProps) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <div className='flex gap-2 checkbox'>
      <input className='hidden' type='checkbox' id={name} disabled={disabled} {...restProps} {...field} />
      <label
        className={cn(
          'relative pl-7 before:absolute before:left-0 before:top-2/4 before:-translate-y-2/4 before:content-[""] before:block before:size-5 before:border-2 before:border-gray-200 before:rounded-sm bg-white cursor-pointer before:transition-colors before:duration-300 before:hover:border-primary-500 before:z-0',
          {
            'cursor-not-allowed pointer-events-none before:border-gray-200 before:bg-gray-50': disabled,
            'before:border-danger-500 bg-white': error?.message
          }
        )}
        htmlFor={name}
      >
        {labelCheckbox && (
          <div
            className={cn({
              'text-danger-500': error?.message
            })}
          >
            {labelCheckbox}
          </div>
        )}

        <Check
          size={14}
          className='icon-check absolute left-[3px] top-2/4 -translate-y-2/4 text-white opacity-0 invisible transition-opacity duration-300 z-[2]'
          weight='bold'
        />
      </label>
    </div>
  )
}

export default Checkbox
