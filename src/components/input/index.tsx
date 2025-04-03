'use client'

import { cn } from '@/lib/cn'
import { Checks, Eye, EyeSlash, Warning } from '@phosphor-icons/react'
import { forwardRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  extraActions?: React.ReactNode
  isPassword?: boolean
  isOTP?: boolean
  control: Control<any>
  name: string
  classNameInput?: string
  classNameWrapper?: string
  errorMessage?: string
  // eslint-disable-next-line no-unused-vars
  renderProps?: (props: InputProps) => any
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    extraActions,
    isPassword = false,
    isOTP = false,
    name,
    control,
    disabled = false,
    classNameInput = '',
    classNameWrapper = '',
    errorMessage = '',
    renderProps = undefined,
    ...inputProps
  } = props

  const {
    field,
    fieldState: { error, isDirty }
  } = useController({ name, control })
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const hanldeToggleShowPassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  return (
    <div className={cn('form-group [&+&]:mt-4', classNameWrapper)}>
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
              'border-danger-500 focus-within:border-danger-500': error?.message || !!errorMessage,
              'border-success-500 focus-within:border-success-500': isDirty && (!error?.message || !errorMessage),
              'cursor-not-allowed pointer-events-none opacity-50': disabled
            },
            classNameInput
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
            type={isPassword && !isShowPassword ? 'password' : 'text'}
            disabled={disabled}
            {...field}
            {...inputProps}
            ref={ref}
          />

          {/* Type: password */}
          {isPassword && (
            <button
              type='button'
              className='absolute top-2/4 right-[17px] -translate-y-2/4 text-gray-900'
              onClick={hanldeToggleShowPassword}
            >
              {isShowPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
          )}

          {/* Error */}
          {error?.message && !isPassword && !isOTP && (
            <Warning size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-danger-500' />
          )}

          {/* Success */}
          {isDirty && !error?.message && !isPassword && !isOTP && (
            <Checks size={20} className='absolute top-2/4 right-[17px] -translate-y-2/4 text-success-500' />
          )}
        </div>
      )}
      {<p className='text-danger-500 text-body-small-400 mt-1 min-h-5'>{error?.message}</p>}
    </div>
  )
})

export default Input
