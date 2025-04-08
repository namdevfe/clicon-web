import { STORAGE } from '@/constants/storage'
import ApiError from '@/lib/ApiError'
import authService from '@/services/auth-service'
import { Login, LogoutPayload } from '@/types/auth'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'

export const PUT = async () => {
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login

  if (!token) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Something went wrongs!')
  }

  const payload: LogoutPayload = { refreshToken: token.refreshToken }
  await authService.logout(payload)

  cookieStore.delete(STORAGE.AUTH)
  cookieStore.delete(STORAGE.PROFILE)

  return Response.json({ statusCode: StatusCodes.OK, message: 'Logout is successfully.' }, { status: StatusCodes.OK })
}
