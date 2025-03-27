'use client'

import Dropdown from '@/shared/components/dropdown'
import { cn } from '@/shared/lib/cn'
import { CaretDown, Check } from '@phosphor-icons/react'
import { useState } from 'react'

interface CurrencyItem {
  name: string
  code: string
}

const CURRENCIES: CurrencyItem[] = [
  {
    code: 'usd',
    name: 'Dollar (USD)'
  },
  {
    code: 'eur',
    name: 'Euro (EUR)'
  }
]

const DropdownCurrencies = () => {
  const [isShowDropdownCurrencies, setIsShowDropdownCurrencies] = useState<boolean>(false)
  const [selected, setSelected] = useState<CurrencyItem | undefined>(CURRENCIES[0])

  const handleToggleCurrencies = () => {
    setIsShowDropdownCurrencies((prev) => !prev)
  }

  const handleCloseLanguages = () => {
    setIsShowDropdownCurrencies(false)
  }

  const handleCurrencyChange = (item: CurrencyItem) => {
    if (selected?.code !== item.code) {
      setSelected(item)
    } else {
      setSelected(undefined)
    }
  }

  return (
    <Dropdown
      position='right'
      isOpen={isShowDropdownCurrencies}
      onTrigger={handleToggleCurrencies}
      onClose={handleCloseLanguages}
    >
      <Dropdown.Trigger>
        <button className='flex items-center gap-[6px] text-white'>
          <span className='text-body-small-400'>{selected?.name || 'Currency'}</span>
          <CaretDown
            size={12}
            className={cn('transition-transform duration-300', {
              'rotate-180': isShowDropdownCurrencies
            })}
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className='py-2'>
        <div className='flex flex-col'>
          {CURRENCIES.map((currency, index) => {
            const { code, name } = currency || {}
            const isActive = code === selected?.code

            return (
              <div
                key={new Date().getTime() + index}
                className='px-4 py-2 flex items-center justify-between cursor-pointer transition-colors duration-300 group hover:bg-gray-50'
                onClick={() => handleCurrencyChange(currency)}
              >
                <div className='flex items-center gap-3'>
                  <p
                    className={cn(
                      'text-gray-600 text-body-small-500 capitalize transition-colors duration-300 group-hover:text-primary-500',
                      {
                        'text-primary-500 font-medium': isActive
                      }
                    )}
                  >
                    {name}
                  </p>
                </div>

                {isActive && <Check size={16} weight='bold' className='text-primary-500' />}
              </div>
            )
          })}
        </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default DropdownCurrencies
