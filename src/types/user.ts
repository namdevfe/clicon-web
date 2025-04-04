import { addUserSchema, editUserSchema } from '@/schemas/user-schema'
import { Base } from '@/types/global'
import { z } from 'zod'

export interface User extends Base {
  _id: string
  addresses: string[]
  email: string
  password?: string
  firstName: string
  lastName: string
  avatar?: string
  isActive: true
  role: { _id: string; name: string } | string
}

export type AddUserPayload = z.infer<typeof addUserSchema>

export type EditUserPayload = z.infer<typeof editUserSchema>
