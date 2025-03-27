'use client'

import Dropdown from '@/shared/components/dropdown'
import { ShoppingCartSimple } from '@phosphor-icons/react'

const DropdownCart = () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button className='relative px-1 xs:px-3'>
          <ShoppingCartSimple size={32} />
          <span className='absolute -top-1 right-0 xs:right-2 flex items-center justify-center size-5 rounded-full bg-white text-body-tiny-600 text-secondary-700 border-2 border-solid border-secondary-700'>
            2
          </span>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className='-translate-x-[calc(100%-36px)] xs:-translate-x-[calc(100%-44px)]'>
        Shopping Cart
      </Dropdown.Content>
    </Dropdown>
  )
}

export default DropdownCart
