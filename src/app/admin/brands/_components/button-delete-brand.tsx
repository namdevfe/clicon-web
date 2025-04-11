'use client'

import { softDeleteBrand } from '@/app/admin/brands/actions'
import Button from '@/components/button'
import ModalConfirm from '@/components/modal-confirm'
import { Brand } from '@/types/brand'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeleteBrandProps {
  brand: Brand
}

const ButtonDeleteBrand = ({ brand }: ButtonDeleteBrandProps) => {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)

  const handleShowConfirm = () => {
    setIsShowConfirm(true)
  }

  const handleCloseConfirm = () => {
    setIsShowConfirm(false)
  }

  const handleDeleteBrand = async () => {
    const { slug } = brand
    if (slug) {
      setisLoading(true)
      try {
        const response = await softDeleteBrand(slug)
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
        title='Delete brand?'
        description={
          <p>
            <span>
              Are you sure you want to delete <strong>{brand.name}.</strong>
            </span>
            <br />
            <span>You cannot undo this action.</span>
          </p>
        }
        onClose={handleCloseConfirm}
        onOK={handleDeleteBrand}
      />
    </>
  )
}

export default ButtonDeleteBrand
