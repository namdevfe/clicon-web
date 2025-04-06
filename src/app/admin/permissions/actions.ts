'use server'

import { STORAGE } from '@/constants/storage'
import permissionService from '@/services/permission-service'
import { Login } from '@/types/auth'
import { AddPermissionPayload } from '@/types/permission'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addPermission = async (payload: AddPermissionPayload) => {
  const token = JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken

  if (!!accessToken) {
    const response = await permissionService.addPermission(payload, accessToken)
    revalidatePath('/admin/permissions')
    return response
  }
}

export const editPermission = async (id: string, payload: AddPermissionPayload) => {
  const token = JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken

  if (!!accessToken) {
    const response = await permissionService.editPermission(payload, { id, accessToken })
    revalidatePath('/admin/permissions')
    return response
  }
}

// export const deleteRole = async (id: string) => {
//   const token = cookies().get(STORAGE.AUTH) ? (JSON.parse(cookies().get(STORAGE.AUTH)?.value || '') as Login) : null
//   const accessToken = token?.accessToken || ''

//   if (accessToken && id) {
//     const response = await roleService.deleteRole(id, accessToken)
//     revalidatePath('/admin/roles')
//     return response
//   }
// }
