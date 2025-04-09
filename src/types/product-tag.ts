import { addProductTagSchema } from '@/schemas/product-tag-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'

export interface ProductTag extends Base {
  _id: string
  name: string
  slug?: string
  description?: string
}

export type ProductTagList = {
  productTags: ProductTag[]
  pagination: Pagination
}

export type AddProductTagPayload = z.infer<typeof addProductTagSchema>
export type EditProductTagPayload = z.infer<typeof addProductTagSchema>
