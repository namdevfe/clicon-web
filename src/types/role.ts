import { Base } from '@/types/global'

export interface Role extends Base {
  _id?: string
  name: string
  description?: string
  permissions: string[]
}
