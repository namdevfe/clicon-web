import { z } from 'zod'

export const addUserSchema = z.object({
  avatar: z.optional(z.any()),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required').min(6, 'Password must contains least 6 characters'),
  role: z.string()
})

export const editUserSchema = z.object({
  avatar: z.optional(z.any()),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.optional(z.string()),
  role: z.optional(z.string())
})
