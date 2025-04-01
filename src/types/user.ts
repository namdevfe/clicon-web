import { Base } from '@/types/global'

export interface User extends Base {
  _id: string
  addresses: string[]
  email: string
  firstName: string
  lastName: string
  isActive: true
  role: {
    _id: string
    name: string
  }
}
