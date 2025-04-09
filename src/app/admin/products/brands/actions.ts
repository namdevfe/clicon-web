'use server'

import { STORAGE } from '@/constants/storage'
import brandService from '@/services/brand-service'
import { Login } from '@/types/auth'
import { AddBrandPayload, EditBrandPayload } from '@/types/brand'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addBrand = async (payload: AddBrandPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken

  if (accessToken) {
    const response = await brandService.addNew(payload, accessToken)
    revalidatePath('/admin/products/brands')
    return response
  }
}

export const editBrand = async (slug: string, payload: EditBrandPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken

  if (accessToken) {
    const response = await brandService.editBySlug(slug, payload, accessToken)
    revalidatePath('/admin/products/brands')
    return response
  }
}

export const softDelete = async (slug: string) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken || ''

  if (slug && accessToken) {
    const response = await brandService.softDelete(slug, accessToken)
    revalidatePath('/admin/products/brands')
    return response
  }
}
