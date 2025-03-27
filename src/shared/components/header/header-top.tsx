'use client'

import Button from '@/shared/components/button'
import Container from '@/shared/components/container'
import { ArrowRight, X } from '@phosphor-icons/react'
import { useState } from 'react'

const HeaderTop = () => {
  const [isShowDiscount, setIsShowDiscount] = useState<boolean>(true)

  const handleCloseDiscount = () => {
    setIsShowDiscount(false)
  }

  if (isShowDiscount) {
    return (
      <div className='relative h-20 py-4 pr-6 bg-gray-900'>
        <Container className='flex items-center justify-between'>
          {/* Left */}
          <div className='hidden xs:flex items-center gap-3'>
            <p className='flex items-center justify-center h-10 py-[6px] px-2 bg-warning-300 text-body-xl-600 text-gray-900 -rotate-3'>
              Black
            </p>
            <p className='text-white text-heading3'>Friday</p>
          </div>

          {/* Middle */}
          <p className='flex items-center gap-2 text-white'>
            <span className='text-body-small-500'>Up to</span>
            <span className='text-warning-500 text-display4'>59%</span>
            <span className='text-body-xl-600 uppercase'>Off</span>
          </p>

          {/* Right */}
          <div>
            <Button className='rounded-0' variant='warning' size='medium' afterIcon={<ArrowRight size={20} />}>
              Shop now
            </Button>
          </div>
        </Container>

        {/* Close button */}
        <Button
          className='absolute t-6 right-1 sm:right-6 bottom-6 bg-gray-800 text-white min-w-8 w-8 h-8 gap-x-0 p-2 hover:bg-gray-800'
          onClick={handleCloseDiscount}
        >
          <X size={16} />
        </Button>
      </div>
    )
  }
}

export default HeaderTop
