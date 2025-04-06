import { STORAGE } from '@/constants/storage'
import ApiError from '@/lib/ApiError'
import authService from '@/services/auth-service'
import { Login, LogoutPayload } from '@/types/auth'
import { User } from '@/types/user'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'

export const PUT = async () => {
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const profile = JSON.parse(cookieStore.get(STORAGE.PROFILE)?.value || '') as User

  if (!token || !profile) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Something went wrongs!')
  }

  const payload: LogoutPayload = { _id: profile._id, refreshToken: token.refreshToken }
  const response = await authService.logout(payload)
  if (response?.statusCode === StatusCodes.OK) {
    cookieStore.delete(STORAGE.AUTH)
    cookieStore.delete(STORAGE.PROFILE)
    return Response.json({ message: response.message }, { status: response.statusCode })
  }
}
