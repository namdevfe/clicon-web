import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { Role } from '@/types/role'

const roleService = {
  getAllRoles() {
    return http.get<ApiResponse<Role[]>>('/roles/get-all-roles')
  }
}

export default roleService
