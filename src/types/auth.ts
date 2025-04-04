import { z } from 'zod'
import { loginSchema, registerSchema } from '@/schemas/auth-schema'
import { User } from '@/types/user'

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

export type LogoutPayload = {
  _id: string
  refreshToken: string
}

export type ProfileResponse = User & {
  role: {
    _id: string
    name: string
  }
}
