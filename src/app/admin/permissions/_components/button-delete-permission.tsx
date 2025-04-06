'use client'

import { deletePermission } from '@/app/admin/permissions/actions'
import Button from '@/components/button'
import ModalConfirm from '@/components/modal-confirm'
import { Permission } from '@/types/permission'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeletePermissionProps {
  permission: Permission
}

const ButtonDeletePermission = ({ permission }: ButtonDeletePermissionProps) => {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleShowConfirm = () => {
    setIsShowConfirm(true)
  }

  const handleCloseConfirm = () => {
    setIsShowConfirm(false)
  }

  const handleDeletePermission = async () => {
    if (permission._id) {
      setIsLoading(true)
      try {
        const response = await deletePermission(permission._id)
        if (!!response?.data) {
          toast.success(response.message)
        }
      } catch (error: any) {
        toast.error(error?.message || 'Something went wrongs!')
      } finally {
        setIsLoading(false)
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
        title='Delete permission?'
        description={
          <p>
            <span>
              Are you sure you want to delete <strong>{permission.url}.</strong>
            </span>
            <br />
            <span>You cannot undo this action.</span>
          </p>
        }
        onClose={handleCloseConfirm}
        onOK={handleDeletePermission}
      />
    </>
  )
}

export default ButtonDeletePermission
