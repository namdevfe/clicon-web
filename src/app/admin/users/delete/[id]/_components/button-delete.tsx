'use client'

import { deleteUser } from '@/app/admin/users/actions'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ButtonDeleteProps {
  id: string
}

const ButtonDelete = ({ id }: ButtonDeleteProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteUser = async () => {
    setIsLoading(true)
    try {
      const response = await deleteUser(id)
      if (!!response?.data) {
        toast.success(response.message)
        router.push('/admin/users')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrongs!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button isLoading={isLoading} disabled={isLoading} variant='danger' size='small' onClick={handleDeleteUser}>
      Delete user
    </Button>
  )
}

export default ButtonDelete
