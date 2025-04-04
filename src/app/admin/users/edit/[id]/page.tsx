import UserForm from '@/app/admin/users/_components/user-form'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import userService from '@/services/user-service'
import { Login } from '@/types/auth'
import { User } from '@/types/user'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'
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
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value as string) as Login
  const userData = await getUserDetails(params.id, token.accessToken)

  return (
    <Container className='py-14 flex justify-center'>
      <Card title='Edit user' className='max-w-[500px] flex-1'>
        <UserForm user={userData as User} />
      </Card>
    </Container>
  )
}

export default EditUserPage
