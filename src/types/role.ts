import { addRoleSchema } from '@/schemas/role-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'
export interface Role extends Base {
  _id?: string
  name: string
  description?: string
  permissions: string[]
}

export interface RoleList {
  roles: Role[]
  pagination: Pagination
}

export type AddRolePayload = z.infer<typeof addRoleSchema>
