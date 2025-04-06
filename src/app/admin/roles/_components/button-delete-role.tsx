'use client'

import { deleteRole } from '@/app/admin/roles/actions'
import Button from '@/components/button'
import ModalConfirm from '@/components/modal-confirm'
import { Role } from '@/types/role'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeleteRoleProps {
  role: Role
}

const ButtonDeleteRole = ({ role }: ButtonDeleteRoleProps) => {
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleShowConfirm = () => {
    setIsShowConfirm(true)
  }

  const handleCloseConfirm = () => {
    setIsShowConfirm(false)
  }

  const handleDeleteRole = async () => {
    if (role._id) {
      setIsLoading(true)
      try {
        const response = await deleteRole(role._id)
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
        title='Delete role?'
        description={
          <p>
            <span>
              Are you sure you want to delete <strong>{role.name}.</strong>
            </span>
            <br />
            <span>You cannot undo this action.</span>
          </p>
        }
        onClose={handleCloseConfirm}
        onOK={handleDeleteRole}
      />
    </>
  )
}

export default ButtonDeleteRole
