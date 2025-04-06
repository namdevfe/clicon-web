'use client'

import { addPermission, editPermission } from '@/app/admin/permissions/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import { addPermissionSchema } from '@/schemas/permission-schema'
import { AddPermissionPayload, Permission } from '@/types/permission'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface PermissionFormProps {
  permission?: Permission
}

const PermissionForm = ({ permission }: PermissionFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, control, reset } = useForm<AddPermissionPayload>({
    defaultValues: {
      url: '',
      description: ''
    },
    resolver: zodResolver(addPermissionSchema)
  })

  const handleAddPermission = async (payload: AddPermissionPayload) => {
    setIsLoading(true)
    try {
      const response = await addPermission(payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset()
        router.push('/admin/permissions')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }
  const handleEditPermission = async (payload: AddPermissionPayload) => {
    if (permission?._id) {
      setIsLoading(true)
      try {
        const response = await editPermission(permission._id, payload)
        if (response?.data?._id) {
          toast.success(response.message)
          router.push('/admin/permissions')
        }
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handlePermissionFormSubmit = async (values: AddPermissionPayload) => {
    const payload = { ...values }

    !!permission ? await handleEditPermission(payload) : await handleAddPermission(payload)
  }

  useEffect(() => {
    if (permission) {
      reset({
        url: permission.url || '',
        description: permission.description || ''
      })
    }
  }, [permission, reset])

  return (
    <form onSubmit={handleSubmit(handlePermissionFormSubmit)}>
      <Input name='url' control={control} label='URL' disabled={isLoading} />
      <Input name='description' control={control} label='Description' disabled={isLoading} />

      <div className='flex items-center gap-2 mt-6'>
        <Button type='submit' size='medium' isLoading={isLoading} disabled={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default PermissionForm
