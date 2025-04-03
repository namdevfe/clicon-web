'use client'

import Dropdown from '@/components/dropdown'
import { cn } from '@/lib/cn'
import { CaretDown, Check } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

interface LanguageItem {
  icon: string
  code: string
  name: string
}

export const LANGUAGES: LanguageItem[] = [
  {
    icon: '/images/icon-usa.svg',
    code: 'en',
    name: 'English'
  },
  {
    icon: '/images/icon-mandarin.svg',
    code: 'ma',
    name: 'Mandarin'
  },
  {
    icon: '/images/icon-russia.svg',
    code: 'ru',
    name: 'Russia'
  }
]

const DropdownLanguages = () => {
  const [isShowDropdownLanguages, setIsShowDropdownLanguages] = useState<boolean>(false)
  const [selected, setSelected] = useState<LanguageItem | undefined>(LANGUAGES[0])

  const handleToggleLanguages = () => {
    setIsShowDropdownLanguages((prev) => !prev)
  }

  const handleCloseLanguages = () => {
    setIsShowDropdownLanguages(false)
  }

  const handleLanguageChange = (item: LanguageItem) => {
    if (selected?.code !== item.code) {
      setSelected(item)
    } else {
      setSelected(undefined)
    }
  }

  return (
    <Dropdown
      position='right'
      isOpen={isShowDropdownLanguages}
      onTrigger={handleToggleLanguages}
      onClose={handleCloseLanguages}
    >
      <Dropdown.Trigger>
        <button className='flex items-center gap-[6px] text-white'>
          <span className='text-body-small-400'>{selected?.name || 'Languages'}</span>
          <CaretDown
            size={12}
            className={cn('transition-transform duration-300', {
              'rotate-180': isShowDropdownLanguages
            })}
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className='py-2 z-[103]'>
        <div className='flex flex-col'>
          {LANGUAGES.map((language, index) => {
            const { code, icon, name } = language || {}
            const isActive = code === selected?.code

            return (
              <div
                key={new Date().getTime() + index}
                className='px-4 py-2 flex items-center justify-between cursor-pointer transition-colors duration-300 group hover:bg-gray-50'
                onClick={() => handleLanguageChange(language)}
              >
                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0 border border-gray-100 size-5 rounded-full overflow-hidden'>
                    <Image src={icon} width={20} height={20} className='w-full h-full object-cover' alt={name} />
                  </div>

                  <p
                    className={cn('text-gray-600 capitalize transition-colors duration-300 group-hover:text-gray-900', {
                      'text-gray-900': isActive
                    })}
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

export default DropdownLanguages
