'use client'

import { cn } from '@/shared/lib/cn'
import { Checks, Eye, EyeSlash, Warning } from '@phosphor-icons/react'
import { Control, useController } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  extraActions?: React.ReactNode
  isPassword?: boolean
  control: Control<any>
  name: string
  // eslint-disable-next-line no-unused-vars
  renderProps?: (props: InputProps) => any
  onShowPassword?: () => void
}

const Input = (props: InputProps) => {
  const {
    label,
    extraActions,
    type = 'text',
    isPassword = false,
    name,
    control,
    disabled = false,
    renderProps = undefined,
    onShowPassword,
    ...inputProps
  } = props

  const {
    field,
    fieldState: { error, isDirty }
  } = useController({ name, control })

  return (
    <div className={cn('form-group [&+&]:mt-8')}>
      {(label || extraActions) && (
        <div className='flex items-center justify-between text-body-small-400 text-gray-900 mb-2'>
          {label && (
            <label htmlFor={name} className='capitalize'>
              {label}
            </label>
          )}
          {extraActions}
        </div>
      )}

      {(renderProps && renderProps?.({ name, control, disabled, ...inputProps })) || (
        <div
          className={cn(
            'relative w-full h-11 rounded-sm bg-white border border-solid border-gray-100 transition-colors duration-300 focus-within:border-primary-500',
            {
              'border-danger-500 focus-within:border-danger-500': error?.message,
              'border-success-500 focus-within:border-success-500': isDirty && !error?.message,
              'cursor-not-allowed pointer-events-none opacity-50': disabled
            }
          )}
        >
          <input
            id={name}
            className={cn(
              'w-full h-full py-3 pl-4 pr-11 placeholder:text-gray-500 placeholder:transition-colors placeholder:duration-300 focus-within:placeholder:text-gray-300',
              {
                'bg-danger-50': error?.message,
                'bg-success-50': isDirty && !error?.message
              }
            )}
            type={type}
            disabled={disabled}
            {...field}
            {...inputProps}
          />

          {error?.message && <p className='text-danger-500 text-body-small-400 mt-1'>{error.message}</p>}

          {/* Type: password */}
          {isPassword && (
            <button
              type='button'
              className='absolute top-2/4 right-[17px] -translate-y-2/4 text-gray-900'
              onClick={() => onShowPassword?.()}
            >
              {type === 'text' ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
          )}

          {/* Error */}
          {error?.message && !isPassword && (
            <Warning size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-danger-500' />
          )}

          {/* Success */}
          {isDirty && !error?.message && !isPassword && (
            <Checks size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-success-500' />
          )}
        </div>
      )}
    </div>
  )
}

export default Input
