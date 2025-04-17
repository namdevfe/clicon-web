import { z } from 'zod'

export const addProductSchema = z.object({
  name: z.string().min(1, 'Name is required.').trim(),
  description: z.optional(z.string().trim()),
  imageCover: z.optional(z.any()),
  images: z.array(z.any().optional()),
  price: z.number({
    required_error: 'Price is required.'
  }),
  oldPrice: z.optional(z.number()),
  quantity: z
    .number({
      required_error: 'Quantity is required.'
    })
    .gte(1, { message: 'Quantity must be greate than or equal 1' }),
  specification: z.optional(z.string().trim()),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  tags: z.optional(z.array(z.string().trim())),
  stock: z.optional(z.number())
})
