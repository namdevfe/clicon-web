import { addPermissionSchema } from '@/schemas/permission-schema'
import { Base, Pagination } from '@/types/global'
import { z } from 'zod'

export interface Permission extends Base {
  _id?: string
  url: string
  description?: string
}

export interface PermissionList {
  permissions: Permission[]
  pagination: Pagination
}

export type AddPermissionPayload = z.infer<typeof addPermissionSchema>
