import { addProductSchema } from '@/schemas/product-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'

export interface ProductAttribute {
  name: string
  value: string
}
export interface Product extends Base {
  _id?: string
  name: string
  slug?: string
  description?: string
  imageCover: string
  images: string[]
  price: number
  oldPrice?: number
  quantity: number
  specification?: string
  category: string
  tags: string[]
  brand: string
  stock?: number
  attributes?: ProductAttribute[]
}

export type AddProductPayload = z.infer<typeof addProductSchema>

export type ProductList = {
  products: Product[]
  pagination: Pagination
}
