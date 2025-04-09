import { z } from 'zod'

export const addProductTagSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.optional(z.string())
})
