'use client'

import { softDeleteProductTag } from '@/app/admin/tags/actions'
import Button from '@/components/button'
import ModalConfirm from '@/components/modal-confirm'
import { ProductTag } from '@/types/product-tag'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeleteProductTagProps {
  productTag: ProductTag
}

const ButtonDeleteProductTag = ({ productTag }: ButtonDeleteProductTagProps) => {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)

  const handleShowConfirm = () => {
    setIsShowConfirm(true)
  }

  const handleCloseConfirm = () => {
    setIsShowConfirm(false)
  }

  const handleDeleteProductTag = async () => {
    const { slug } = productTag
    if (slug) {
      setisLoading(true)
      try {
        const response = await softDeleteProductTag(slug)
        if (response?.data?._destroy) {
          toast.success(response.message)
        }
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setisLoading(false)
      }
    }
  }
  return (
    <>
      <Button variant='danger' className='min-w-8 w-7 h-8 p-0 rounded-full' onClick={handleShowConfirm}>
        <Trash size={18} />
      </Button>

      <ModalConfirm
        isLoading={isLoading}
        isOpen={isShowConfirm}
        title='Delete prduct tag?'
        description={
          <p>
            <span>
              Are you sure you want to delete <strong>{productTag.name}.</strong>
            </span>
            <br />
            <span>You cannot undo this action.</span>
          </p>
        }
        onClose={handleCloseConfirm}
        onOK={handleDeleteProductTag}
      />
    </>
  )
}

export default ButtonDeleteProductTag
