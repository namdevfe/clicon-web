import RoleForm from '@/app/admin/roles/_components/role-form'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import permissionService from '@/services/permission-service'
import { Login } from '@/types/auth'
import { cookies } from 'next/headers'

const getAllPermissions = async (accessToken: string) => {
  if (accessToken) {
    try {
      const response = await permissionService.getAllPermissions(accessToken)
      return response?.data
    } catch (error) {
      console.log(error)
    }
  }
}

const AddRolePage = async () => {
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  const listPermissions = await getAllPermissions(accessToken)

  return (
    <Container className='py-14'>
      <Card title='Add role'>
        <RoleForm permissions={listPermissions || []} />
      </Card>
    </Container>
  )
}

export default AddRolePage
