import { z } from 'zod'

export const addProductCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.optional(z.string())
})
