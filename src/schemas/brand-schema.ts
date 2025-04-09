import { z } from 'zod'

export const addBrandSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.optional(z.string())
})
