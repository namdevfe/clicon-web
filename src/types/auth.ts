import { loginSchema } from '@/schemas/auth-schema'
import { z } from 'zod'

export interface Login {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = z.infer<typeof loginSchema>

export type AuthPayload = Login
