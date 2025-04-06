import PermissionForm from '@/app/admin/permissions/_components/permission-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import permissionService from '@/services/permission-service'
import { Login } from '@/types/auth'
import { CaretRight, Key, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getPermissionDetails = async (id: string, accessToken: string) => {
  if (accessToken) {
    try {
      const response = await permissionService.getPermissionDetails(id, accessToken)
      return response?.data
    } catch (error) {
      console.log(error)
    }
  }
}

interface EditPermissionPageProps {
  params: {
    id: string
    [key: string]: string | string[] | undefined
  }
}

const EditPermissionPage = async ({ params }: EditPermissionPageProps) => {
  // Get token
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  // Call apis
  const permissionDetails = await getPermissionDetails(params.id, accessToken)

  return (
    <Container className='py-12'>
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
            <Key size={20} className='flex-shrink-0' />
            <span>Permissions</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{params?.id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='mt-4 flex justify-center'>
        <Card title='Edit permission' className='max-w-[500px] w-full'>
          <PermissionForm permission={permissionDetails} />
        </Card>
      </div>
    </Container>
  )
}

export default EditPermissionPage
