import RoleForm from '@/app/admin/roles/_components/role-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import { getAllPermissions } from '@/lib/api-common'
import { Login } from '@/types/auth'
import { CaretRight, Stack, UserCircleGear } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const AddRolePage = async () => {
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  const listPermissions = await getAllPermissions(accessToken)

  return (
    <Container className='py-14'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href='/' className='flex items-center gap-2'>
            <Stack size={20} className='flex-shrink-0' />
            <span>Dashboard</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/' className='flex items-center gap-2'>
            <UserCircleGear size={20} className='flex-shrink-0' />
            <span>Roles</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='Add role' className='mt-4'>
        <RoleForm permissions={listPermissions || []} />
      </Card>
    </Container>
  )
}

export default AddRolePage
