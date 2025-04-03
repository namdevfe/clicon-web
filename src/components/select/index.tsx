'use client'

import Dropdown from '@/components/dropdown'
import { useRectResize } from '@/hooks'
import { cn } from '@/lib/cn'
import { CaretDown } from '@phosphor-icons/react'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'

export interface SelectOption {
  value?: string
  label: string
}

interface SelectProps {
  name: string
  control: Control<any>
  options: SelectOption[]
  className?: string
  placeholder?: string
  defaultValue?: any
  disabled?: boolean
}

const Select = ({
  name,
  control,
  options = [],
  defaultValue,
  className = '',
  placeholder = '',
  disabled = false
}: SelectProps) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitSuccessful }
  } = useController({ name, control })
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const selectTriggerRef = useRef<HTMLDivElement | null>(null)
  const { coord, setCoord } = useRectResize(selectTriggerRef)
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(() => {
    return !!defaultValue ? options.find((option) => option.value === defaultValue) : undefined
  })

  const handleToggleSelect = () => {
    setIsShowList((prev) => !prev)
    setCoord(selectTriggerRef.current?.getBoundingClientRect() as DOMRect)
  }

  const handleCloseSelect = () => {
    setIsShowList(false)
  }

  const handleSelectChange = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, option: SelectOption) => {
    e.stopPropagation()
    setSelectedOption(option)
    field.onChange(option.value)
    handleCloseSelect()
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSelectedOption(undefined)
      field.onChange('')
    }
  }, [isSubmitSuccessful])

  return (
    <Dropdown
      className={cn(className)}
      isOpen={isShowList}
      onTrigger={() => !disabled && handleToggleSelect()}
      onClose={handleCloseSelect}
    >
      <Dropdown.Trigger>
        <div
          ref={selectTriggerRef}
          className={cn(
            'flex items-center justify-between py-3 px-4 w-full min-w-60 border border-gray-100 text-body-small-400 text-gray-300 cursor-pointer transition-colors duration-300 hover:text-gray-900',
            {
              'text-gray-900': isShowList && !!selectedOption,
              'border-primary-500': isShowList,
              'border-danger-500 bg-danger-50': !!error?.message,
              'cursor-not-allowed pointer-events-none opacity-50': disabled
            }
          )}
        >
          <span
            className={cn({
              'text-gray-700': !!selectedOption
            })}
          >
            {selectedOption?.label || placeholder || 'Select...'}
          </span>
          <CaretDown
            size={16}
            className={cn('transition-transform duration-300 will-change-transform', {
              'rotate-180': isShowList
            })}
          />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content
        className={cn('fixed')}
        styles={{
          width: isShowList && coord && coord.width > 0 ? `${coord.width}px` : 0
        }}
      >
        <div className='flex flex-col py-2'>
          {options.map((option, index) => (
            <div
              key={option.value || new Date().getTime() + index}
              className={cn(
                'py-2 px-4 text-gray-600 text-body-small-400 transition-colors duration-300 cursor-pointer hover:text-gray-900 hover:bg-gray-50',
                {
                  'pointer-events-none cursor-not-allowed text-center': !option.value,
                  'bg-primary-50 text-primary-500': !!option.value && selectedOption?.value === option.value
                }
              )}
              onClick={(e) => option.value && handleSelectChange(e, option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Select
