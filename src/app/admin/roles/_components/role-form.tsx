'use client'

import { addRole, editRole } from '@/app/admin/roles/actions'
import Button from '@/components/button'
import Card from '@/components/card'
import Checkbox from '@/components/checkbox'
import Input from '@/components/input'
import { addRoleSchema } from '@/schemas/role-schema'
import { Permission } from '@/types/permission'
import { AddRolePayload, Role } from '@/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface RoleFormProps {
  permissions: Permission[]
  role?: Role
}

const RoleForm = ({ permissions = [], role }: RoleFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const { handleSubmit, control, reset } = useForm<AddRolePayload>({
    defaultValues: {
      name: '',
      description: '',
      permissions: []
    },
    resolver: zodResolver(addRoleSchema)
  })

  const handlePermissionChange = (permissionId: string) => {
    const isChecked = selectedPermissions.includes(permissionId)

    if (isChecked) {
      setSelectedPermissions((prev) => prev.filter((id) => permissionId !== id))
    } else {
      setSelectedPermissions((prev) => [...prev, permissionId])
    }
  }

  // Handle add role
  const handleAddRole = async (payload: AddRolePayload) => {
    setIsLoading(true)
    try {
      const response = await addRole(payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset()
        router.push('/admin/roles')
      }
    } catch (error: any) {
      toast.error(error.message ?? 'Something went wrongs!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRole = async (payload: AddRolePayload) => {
    setIsLoading(true)
    try {
      const response = await editRole(role?._id as string, payload)
      if (!!response?.data) {
        toast.success(response.message)
        router.push('/admin/roles')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleFormSubmit = async (values: AddRolePayload) => {
    const payload = { ...values }

    if (selectedPermissions.length > 0) {
      payload.permissions = selectedPermissions
    }

    !!role ? await handleEditRole(payload) : await handleAddRole(payload)
  }

  // Editting mode
  useEffect(() => {
    if (!!role) {
      reset({
        name: role.name || '',
        description: role.description || ''
        // permissions: role.permissions || []
      })

      setSelectedPermissions(role.permissions || [])
    }
  }, [role, reset])

  return (
    <form onSubmit={handleSubmit(handleRoleFormSubmit)}>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
        {/* Information */}
        <Card title='General'>
          <Input name='name' control={control} label='Name' disabled={isLoading} />
          <Input name='description' control={control} label='Description' disabled={isLoading} />
        </Card>

        {/* Assign permissions to role */}
        <Card title='Assign permissions'>
          <div className='flex flex-col gap-2'>
            {permissions.map((permission) => {
              return (
                <Checkbox
                  labelCheckbox={permission.description}
                  control={control}
                  key={permission._id}
                  name={permission.url}
                  checked={selectedPermissions.includes(permission._id as string)}
                  onChange={() => handlePermissionChange(permission._id as string)}
                />
              )
            })}
          </div>
        </Card>
      </div>

      <div className='flex items-center gap-2 mt-6'>
        <Button type='submit' size='medium' isLoading={isLoading} disabled={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default RoleForm
