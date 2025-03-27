import Profile from '@/app/(customer)/(home)/profile'
import { STORAGE } from '@/constants/storage'
import authService from '@/services/auth-service'
import { cookies } from 'next/headers'

const HomePage = async () => {
  const cookieStore = cookies()
  const token =
    cookieStore.get(STORAGE.AUTH)?.value !== undefined
      ? JSON.parse(cookieStore.get(STORAGE.AUTH)?.value as string)
      : undefined

  try {
    if (!!token) {
      const profile = await authService.getProfile(token?.accessToken)
      console.log('🚀profile---->', profile)
    }
  } catch (error) {
    console.log('🚀error---->', error)
  }

  return <Profile />
}

export default HomePage
