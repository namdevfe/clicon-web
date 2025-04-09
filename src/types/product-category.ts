import { addProductCategorySchema } from '@/schemas/product-category-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'

export interface ProductCategory extends Base {
  _id: string
  name: string
  slug?: string
  description?: string
}

export interface ProductCategoryList {
  productCategories: ProductCategory[]
  pagination: Pagination
}

export type AddProductCategoryPayload = z.infer<typeof addProductCategorySchema>
export type EditProductCategoryPayload = z.infer<typeof addProductCategorySchema>
