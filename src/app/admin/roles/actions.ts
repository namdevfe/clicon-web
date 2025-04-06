'use server'

import { STORAGE } from '@/constants/storage'
import roleService from '@/services/role-service'
import { Login } from '@/types/auth'
import { AddRolePayload } from '@/types/role'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addRole = async (payload: AddRolePayload) => {
  const token = JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken

  if (!!accessToken) {
    const response = await roleService.addRole(payload, accessToken)
    revalidatePath('/admin/roles')
    return response
  }
}

export const editRole = async (id: string, payload: AddRolePayload) => {
  const token = JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken

  if (!!accessToken) {
    const response = await roleService.editRole(payload, { id, accessToken })
    revalidatePath('/admin/roles')
    return response
  }
}

export const deleteRole = async (id: string) => {
  const token = cookies().get(STORAGE.AUTH) ? (JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken || ''

  if (accessToken && id) {
    const response = await roleService.deleteRole(id, accessToken)
    revalidatePath('/admin/roles')
    return response
  }
}
