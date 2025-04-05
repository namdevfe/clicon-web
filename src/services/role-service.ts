import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { Role } from '@/types/role'

const roleService = {
  getAllRoles() {
    return http.get<ApiResponse<Role[]>>('/roles/get-all-roles')
  },
  getRoleDetails(id: string) {
    return http.get<ApiResponse<Role>>(`/roles/get-role-details/${id}`)
  }
}

export default roleService
