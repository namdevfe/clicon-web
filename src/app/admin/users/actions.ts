'use server'
import { STORAGE } from '@/constants/storage'
import userService from '@/services/user-service'
import { Login } from '@/types/auth'
import { AddUserPayload, EditUserPayload } from '@/types/user'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addUser = async (data: AddUserPayload) => {
  const payload = { ...data }
  const token = cookies().get(STORAGE.AUTH) ? (JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken || ''

  if (accessToken) {
    const response = await userService.addUser(payload, accessToken)
    revalidatePath('/admin/users')
    return response
  }
}

export const editUser = async (id: string, data: EditUserPayload) => {
  const payload = { ...data }
  const token = cookies().get(STORAGE.AUTH) ? (JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken || ''

  if (accessToken) {
    const response = await userService.editUser(payload, { id, accessToken })
    revalidatePath('/admin/users')
    return response
  }
}
