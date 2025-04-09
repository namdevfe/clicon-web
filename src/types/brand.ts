import { addBrandSchema } from '@/schemas/brand-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'

export interface Brand extends Base {
  _id: string
  name: string
  slug?: string
  description?: string
}

export type BrandList = {
  brands: Brand[]
  pagination: Pagination
}

export type AddBrandPayload = z.infer<typeof addBrandSchema>
export type EditBrandPayload = z.infer<typeof addBrandSchema>
