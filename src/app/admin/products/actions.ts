/* eslint-disable no-useless-catch */
'use server'

import { STORAGE } from '@/constants/storage'
import brandService from '@/services/brand-service'
import productCategoryService from '@/services/product-category-service'
import productService from '@/services/product-service'
import productTagService from '@/services/product-tag-service'
import { Login } from '@/types/auth'
import { QueryParams } from '@/types/global'
import { AddProductPayload } from '@/types/product'
import { cookies } from 'next/headers'

export const getAllBrands = async () => {
  const response = await brandService.getAll()
  return response
}

export const getALlCategories = async () => {
  const response = await productCategoryService.getAllProductCategories()
  return response
}

export const getAllTags = async () => {
  const response = await productTagService.getAll()
  return response
}

export const getProducts = async (query: QueryParams) => {
  try {
    const response = await productService.getList(query)
    if (response?.data && response.data?.products.length > 0) {
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export const addProduct = async (payload: AddProductPayload) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null

  if (token?.accessToken) {
    const response = await productService.add(payload, token.accessToken)
    return response
  }
}
