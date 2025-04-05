'use client'
import Button from '@/components/button'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('@/components/modal'), { ssr: false })

interface ModalConfirmProps {
  title: string
  description?: React.ReactNode
  isOpen: boolean
  isLoading?: boolean
  onClose?: () => void
  onOK?: () => void
}

const DEFAULT_FUNC = () => {}
const ModalConfirm = ({
  title,
  description,
  isOpen = false,
  isLoading = false,
  onClose = DEFAULT_FUNC,
  onOK = DEFAULT_FUNC
}: ModalConfirmProps) => {
  const handleClose = () => {
    onClose?.()
  }

  const handleConfirmClick = () => {
    onOK?.()
  }

  return (
    <Modal isOpen={isOpen} isLoading={isLoading} onClose={handleClose}>
      <div className='text-center mb-10'>
        {<h4 className='text-body-large-600 text-gray-900'>{title}</h4>}
        {description && <div className='mt-4 text-body-small-400'>{description}</div>}
      </div>
      <div className='flex items-center justify-center gap-6'>
        <Button variant='gray' size='medium' onClick={handleClose}>
          Cancle
        </Button>
        <Button variant='danger' size='medium' onClick={handleConfirmClick}>
          Confirm Delete
        </Button>
      </div>
    </Modal>
  )
}

export default ModalConfirm
