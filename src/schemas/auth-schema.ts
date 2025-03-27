import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password must contains least 6 characters')
  })
  .required()
