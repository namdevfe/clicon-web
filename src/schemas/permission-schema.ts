import { z } from 'zod'

export const addPermissionSchema = z.object({
  url: z.string().min(1, 'URL is required'),
  description: z.optional(z.string())
})
