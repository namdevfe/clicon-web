'use client'

import { cn } from '@/lib/cn'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface SearchProps {
  className?: string
}

const Search = ({ className = '' }: SearchProps) => {
  return (
    <form
      method='POST'
      className={cn(
        'relative h-[48px] max-w-full xs:max-w-[646px] flex items-center gap-2 rounded-sm overflow-hidden bg-white',
        className
      )}
    >
      <input
        type='text'
        placeholder='Search for anything...'
        className='w-full h-full py-[14px] pl-5 pr-12 placeholder:text-body-small-400 placeholder:text-gray-500'
      />
      <MagnifyingGlass size={20} className='absolute right-5 top-2/4 -translate-y-2/4' />
    </form>
  )
}

export default Search
