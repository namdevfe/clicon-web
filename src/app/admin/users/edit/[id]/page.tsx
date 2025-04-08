import UserForm from '@/app/admin/users/_components/user-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import userService from '@/services/user-service'
import { Login } from '@/types/auth'
import { User } from '@/types/user'
import { CaretRight, Stack, Users } from '@phosphor-icons/react/dist/ssr'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const getUserDetails = async (id: string, accessToken: string) => {
  if (accessToken && id) {
    try {
      const response = await userService.getUserDetails(id, accessToken)
      return response?.data?._id && response?.data
    } catch (error: any) {
      // User not found redirect to not found page
      if (error?.statusCode === StatusCodes.NOT_FOUND) {
        notFound()
      }
    }
  }
}

const EditUserPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH)?.value
    ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login)
    : null
  const userData = await getUserDetails(params.id, token?.accessToken || '')

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
            <Users size={20} className='flex-shrink-0' />
            <span>Users</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{params?.id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex justify-center mt-4'>
        <Card title='Edit user' className='max-w-[500px] flex-1'>
          <UserForm user={userData as User} />
        </Card>
      </div>
    </Container>
  )
}

export default EditUserPage
