import { STORAGE } from '@/constants/storage'
import { cookies } from 'next/headers'

export const PUT = async () => {
  cookies().delete(STORAGE.AUTH)
  cookies().delete(STORAGE.PROFILE)
  return Response.json({ message: 'Logout from next-server is successfully' }, { status: 200 })
}
