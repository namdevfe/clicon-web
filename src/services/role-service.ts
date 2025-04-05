import { ROLE_LIMITS } from '@/constants/pagination'
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { Role, RoleList } from '@/types/role'

const roleService = {
  getAllRoles() {
    return http.get<ApiResponse<Role[]>>('/roles/get-all-roles')
  },
  getRolesWithPagination(query?: QueryParams, accessToken?: string) {
    return http.get<ApiResponse<RoleList>>(
      `/roles/get-roles?page=${query?.page}&limit=${query?.limit || ROLE_LIMITS}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  },
  getRoleDetails(id: string) {
    return http.get<ApiResponse<Role>>(`/roles/get-role-details/${id}`)
  },
  addRole(payload: any, accessToken?: string) {
    return http.post<ApiResponse<Role>>('/roles/add-role', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default roleService
