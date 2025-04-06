/* eslint-disable indent */
import { ROLE_LIMITS } from '@/constants/pagination'
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { AddRolePayload, Role, RoleList } from '@/types/role'

const roleService = {
  getAllRoles() {
    return http.get<ApiResponse<Role[]>>('/roles/get-all-roles')
  },
  getRolesWithPagination(query?: QueryParams, accessToken?: string) {
    return http.get<ApiResponse<RoleList>>(
      `/roles/get-roles?page=${query?.page}&limit=${query?.limit || ROLE_LIMITS}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  getRoleDetails(id: string, accessToken?: string) {
    return http.get<ApiResponse<Role>>(
      `/roles/get-role-details/${id}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  addRole(payload: AddRolePayload, accessToken?: string) {
    return http.post<ApiResponse<Role>>(
      '/roles/add-role',
      payload,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  eidtRole(payload: AddRolePayload, { id, accessToken }: { id: string; accessToken: string }) {
    return http.put<ApiResponse<Role>>(
      `/roles/edit-role/${id}`,
      payload,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  }
}

export default roleService
