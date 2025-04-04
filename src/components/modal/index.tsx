'use client'

import { createPortal } from 'react-dom'

const Modal = () => {
  if (document === undefined) return null

  return createPortal(
    <div className='fixed top-0 left-0 z-[105] w-full h-screen flex items-center justify-center'>
      {/* Overlay */}
      <div className='absolute left-0 top-0 w-full h-full bg-gray-800 opacity-80 pointer-events-none visible'>
        Overlay
      </div>

      {/* Inner */}
      <div className='absolute t-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-fit rounded bg-white overflow-hidden'>
        <div className='max-w-[500px] w-[500px]'>Content</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
