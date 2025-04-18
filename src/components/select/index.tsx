import Dropdown from '@/components/dropdown'
import { useRectResize } from '@/hooks'
import { cn } from '@/lib/cn'
import { CaretDown, X } from '@phosphor-icons/react'
import { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react'
import { Control, useController, useFormContext } from 'react-hook-form'

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
  mode?: 'multiple' | 'tags'
}

const Select = forwardRef<HTMLElement, SelectProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ name, control, options = [], defaultValue, className = '', placeholder = '', disabled = false, mode }, _ref) => {
    const {
      field,
      fieldState: { error },
      formState: { isSubmitSuccessful }
    } = useController({ name, control })
    const { resetField } = useFormContext()

    const [isShowList, setIsShowList] = useState<boolean>(false)
    const selectTriggerRef = useRef<HTMLDivElement | null>(null)
    const { coord, setCoord } = useRectResize(selectTriggerRef)
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(() => {
      return !!defaultValue ? options.find((option) => option.value === defaultValue) : undefined
    })
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
    const optionDefault = options.find((option) => option.value === field.value)

    const handleToggleSelect = () => {
      setIsShowList((prev) => !prev)
      setCoord(selectTriggerRef.current?.getBoundingClientRect() as DOMRect)
    }

    const handleCloseSelect = () => {
      setIsShowList(false)
    }

    const handleSelectChange = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, option: SelectOption) => {
      e.stopPropagation()
      if (!mode) {
        // Select single
        setSelectedOption(option)
        field.onChange(option.value)
        handleCloseSelect()
      } else {
        // Select multiple
        setSelectedOptions((prev) => {
          if (prev.some((item) => item.value === option.value)) {
            const newOptions = prev.filter((item) => item.value !== option.value)
            // field.onChange(newOptions.map((item) => item.value))
            return newOptions
          }
          // field.onChange([...prev, option].map((item) => item.value))
          return [...prev, option]
        })
      }
    }

    useEffect(() => {
      if (mode === 'multiple' && selectedOptions.length > 0) {
        field.onChange(selectedOptions)
      }
    }, [])

    useEffect(() => {
      if (isSubmitSuccessful) {
        setSelectedOption(undefined)
        // field.onChange('')
        resetField(name)
        setSelectedOptions([])
        // field.onChange([])
      }
    }, [isSubmitSuccessful])

    useEffect(() => {
      optionDefault && setSelectedOption(optionDefault)
    }, [optionDefault])

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
              'flex items-center justify-between py-3 px-4 w-full h-11 min-w-60 border border-gray-100 text-body-small-400 text-gray-300 cursor-pointer transition-colors duration-300 hover:text-gray-900',
              {
                'text-gray-900': isShowList && !!selectedOption,
                'border-primary-500': isShowList,
                'border-danger-500 bg-danger-50': !!error?.message,
                'cursor-not-allowed pointer-events-none opacity-50': disabled,
                relative: !!mode
              }
            )}
          >
            {/* Display tags on mode === 'multiple' */}
            <div className='absolute top-2/4 left-4 -translate-y-2/4 flex items-center gap-2'>
              {selectedOptions.map((selectedOption, index) => (
                <div
                  key={selectedOption.value || new Date().getTime() + index}
                  className='relative flex items-center justify-center w-fit h-8 px-4 rounded overflow-hidden bg-primary-500 text-white'
                >
                  <span className='pr-3'>{selectedOption.label}</span>
                  <X
                    className='absolute right-2 top-2/4 -translate-y-2/4'
                    size={14}
                    onClick={() =>
                      setSelectedOptions((prev) => prev.filter((item) => item.value !== selectedOption.value))
                    }
                  />
                </div>
              ))}
            </div>

            {selectedOptions.length === 0 && (
              <span
                className={cn({
                  'text-gray-700': !!selectedOption
                })}
              >
                {selectedOption?.label || placeholder || 'Select...'}
              </span>
            )}
            <CaretDown
              size={16}
              className={cn('transition-transform duration-300 will-change-transform', {
                'rotate-180': isShowList,
                'absolute right-4 top-2/4 -translate-y-2/4': !!mode
              })}
            />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content
          className={cn('fixed max-h-[180px] overflow-y-auto overflow-x-hidden')}
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
                    'bg-primary-50 text-primary-500':
                      !!option.value &&
                      (selectedOption?.value === option.value ||
                        selectedOptions.some((selectedOption) => selectedOption.value === option.value))
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
)

export default Select
