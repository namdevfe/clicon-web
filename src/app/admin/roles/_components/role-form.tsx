'use client'

import { addRole } from '@/app/admin/roles/actions'
import Button from '@/components/button'
import Card from '@/components/card'
import Checkbox from '@/components/checkbox'
import Input from '@/components/input'
import { addRoleSchema } from '@/schemas/role-schema'
import { Permission } from '@/types/permission'
import { AddRolePayload } from '@/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface RoleFormProps {
  permissions: Permission[]
}

const RoleForm = ({ permissions = [] }: RoleFormProps) => {
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

  const handleRoleFormSubmit = async (values: AddRolePayload) => {
    const payload = { ...values }

    if (selectedPermissions.length > 0) {
      payload.permissions = selectedPermissions
    }

    await handleAddRole(payload)
  }

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
