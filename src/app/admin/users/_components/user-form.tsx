'use client'

import { addUser, editUser } from '@/app/admin/users/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import Select, { SelectOption } from '@/components/select'
import UploadImage from '@/components/upload-image'
import { uploadFile } from '@/lib/upload'
import { addUserSchema, editUserSchema } from '@/schemas/user-schema'
import roleService from '@/services/role-service'
import { Role } from '@/types/role'
import { AddUserPayload, EditUserPayload, User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface UserFormProps {
  user?: User
}

const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRolesFetching, setIsRolesFetching] = useState<boolean>(true)
  const [roles, setRoles] = useState<Role[]>([])
  const { control, handleSubmit, reset, setValue } = useForm<AddUserPayload | EditUserPayload>({
    defaultValues: {
      avatar: undefined,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: ''
    },
    resolver: zodResolver(!!user ? editUserSchema : addUserSchema)
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

    !!user ? await handleEditUser(user._id, payload) : await handleAddUser(payload)
  }

  const handleEditUser = async (id: string, payload: EditUserPayload) => {
    try {
      const response = await editUser(id, payload)
      if (!!response?.data) {
        setValue('role', '')
        reset()
        toast.success(response.message)
        router.push('/admin/users')
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrongs!')
    } finally {
      setIsLoading(false)
    }
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

  useEffect(() => {
    if (user) {
      const { email, firstName, lastName, role, avatar } = user || {}
      reset({
        email,
        avatar,
        firstName,
        lastName,
        role: role as string
      })
    }
  }, [user, reset])

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
      <Input disabled={isLoading || !!user} label='Email' name='email' control={control} />
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
