import { z } from 'zod'
import { loginSchema, registerSchema } from '@/schemas/auth-schema'

export interface Login {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = z.infer<typeof loginSchema>

export type AuthPayload = Login

export type RegisterPayload = z.infer<typeof registerSchema>

export type EmailVerificationPayload = {
  otpCode: string
}
