'use server'

import { STORAGE } from '@/constants/storage'
import productCategoryService from '@/services/product-category-service'
import { Login } from '@/types/auth'
import { AddProductCategoryPayload } from '@/types/product-category'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addProductCategory = async (payload: AddProductCategoryPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const accessToken = token?.accessToken

  if (accessToken) {
    const response = await productCategoryService.addProductCategory(payload, accessToken)
    revalidatePath('/admin/products/categories')
    return response
  }
}
