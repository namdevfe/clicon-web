'use server'

import { STORAGE } from '@/constants/storage'
import productTagService from '@/services/product-tag-service'
import { Login } from '@/types/auth'
import { AddProductTagPayload, EditProductTagPayload } from '@/types/product-tag'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addProductTag = async (payload: AddProductTagPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken

  if (accessToken) {
    const response = await productTagService.addNew(payload, accessToken)
    revalidatePath('/admin/tags')
    return response
  }
}

export const editProductTag = async (slug: string, payload: EditProductTagPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken

  if (accessToken) {
    const response = await productTagService.editBySlug(slug, payload, accessToken)
    revalidatePath('/admin/tags')
    return response
  }
}

export const softDeleteProductTag = async (slug: string) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken || ''

  if (slug && accessToken) {
    const response = await productTagService.softDelete(slug, accessToken)
    revalidatePath('/admin/tags')
    return response
  }
}
