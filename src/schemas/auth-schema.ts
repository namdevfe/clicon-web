import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password must contains least 6 characters')
  })
  .required()

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
    password: z.string().min(1, 'Password is required').min(6, 'Password must contains least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required')
      .min(6, 'Confirm password must contains least 6 characters'),
    isAgree: z
      .boolean({ required_error: 'Please agrees with terms policy' })
      .refine((val) => val === true, { message: 'You must agree to the terms and conditions' })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Password do not match'
      })
    }
  })

// export const emailVerificationSchema = z.object({
//   otpCode1: z.string().min(1, 'Code is required').max(6, 'Code must incluces 6 numbers')
// })
