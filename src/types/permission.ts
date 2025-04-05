import { Base } from '@/types/global'

export interface Permission extends Base {
  _id?: string
  url: string
  description?: string
}
