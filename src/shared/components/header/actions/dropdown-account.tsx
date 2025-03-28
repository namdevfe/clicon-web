'use client'

import { SignInForm } from '@/shared/components/auth'
import Dropdown from '@/shared/components/dropdown'
import { User } from '@phosphor-icons/react'

const DropdownAccount = () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button className='px-1 xs:px-3'>
          <User size={32} />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className='z-[101] min-w-[424px] p-8 rounded -translate-x-[calc(100%-36px)] xs:-translate-x-[calc(100%-44px)]'>
        <SignInForm type='dropdown' />
      </Dropdown.Content>
    </Dropdown>
  )
}

export default DropdownAccount
