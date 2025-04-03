'use client'

import { addUser } from '@/app/admin/users/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import Select, { SelectOption } from '@/components/select'
import UploadImage from '@/components/upload-image'
import { uploadFile } from '@/lib/upload'
import { addUserSchema } from '@/schemas/user-schema'
import roleService from '@/services/role-service'
import { Role } from '@/types/role'
import { AddUserPayload } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const UserForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRolesFetching, setIsRolesFetching] = useState<boolean>(true)
  const [roles, setRoles] = useState<Role[]>([])
  const { control, handleSubmit, reset, setValue } = useForm<AddUserPayload>({
    defaultValues: {
      avatar: undefined,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: ''
    },
    resolver: zodResolver(addUserSchema)
  })
  const roleOptions: SelectOption[] = [
    {
      label: '------------------ Select role -----------------------'
    },
    ...roles.map((role) => ({
      label: role.name,
      value: role._id
    }))
  ]

  const handleUserFormSubmit = async (values: any) => {
    const payload = { ...values }

    setIsLoading(true)

    // Upload avatar to cloudinary
    if (values?.avatar && values.avatar instanceof File) {
      payload.avatar = await uploadFile(values.avatar)
    }

    await handleAddUser(payload)
  }

  const handleAddUser = async (payload: AddUserPayload) => {
    try {
      const response = await addUser(payload)
      if (response?.statusCode === StatusCodes.OK && response?.message) {
        setValue('role', '')
        reset()
        toast.success(response.message ?? 'Add new user is successfully.')
        router.push('/admin/users')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrongs!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsRolesFetching(true)
      try {
        const response = await roleService.getAllRoles()
        if (response?.data && response.data.length > 0) {
          setRoles(response.data)
        }
      } catch (error: any) {
        toast.error(error?.message || 'Something went wrongs!')
      } finally {
        setIsRolesFetching(false)
      }
    })()
  }, [])

  return (
    <form onSubmit={handleSubmit(handleUserFormSubmit)}>
      <Input
        label='Avatar'
        name='avatar'
        control={control}
        disabled={isLoading}
        renderProps={(props) => {
          return <UploadImage {...props} />
        }}
      />
      <Input disabled={isLoading} label='Email' name='email' control={control} />
      <Input disabled={isLoading} label='Password' name='password' control={control} isPassword />
      <Input disabled={isLoading} label='First name' name='firstName' control={control} />
      <Input disabled={isLoading} label='Last name' name='lastName' control={control} />

      <Input
        disabled={isRolesFetching || isLoading}
        label='Role'
        name='role'
        control={control}
        placeholder='Select role...'
        renderProps={(props) => <Select {...props} options={roleOptions || []} />}
      />

      <div className='flex items-center gap-2 mt-6'>
        <Button type='submit' size='medium' disabled={isLoading} isLoading={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default UserForm
