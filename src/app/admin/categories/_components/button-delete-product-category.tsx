'use client'

import { softDeleteProductCategory } from '@/app/admin/categories/actions'
import Button from '@/components/button'
import ModalConfirm from '@/components/modal-confirm'
import { ProductCategory } from '@/types/product-category'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeleteProductCategoryProps {
  productCategory: ProductCategory
}

const ButtonDeleteProductCategory = ({ productCategory }: ButtonDeleteProductCategoryProps) => {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)

  const handleShowConfirm = () => {
    setIsShowConfirm(true)
  }

  const handleCloseConfirm = () => {
    setIsShowConfirm(false)
  }

  const handleDeleteProductCategory = async () => {
    const { slug } = productCategory
    if (slug) {
      setisLoading(true)
      try {
        const response = await softDeleteProductCategory(slug)
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
        title='Delete product category?'
        description={
          <p>
            <span>
              Are you sure you want to delete <strong>{productCategory.name}.</strong>
            </span>
            <br />
            <span>You cannot undo this action.</span>
          </p>
        }
        onClose={handleCloseConfirm}
        onOK={handleDeleteProductCategory}
      />
    </>
  )
}

export default ButtonDeleteProductCategory
