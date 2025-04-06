/* eslint-disable indent */
import { PERMISSION_LIMITS } from '@/constants/pagination'
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { AddPermissionPayload, Permission, PermissionList } from '@/types/permission'

const permissionService = {
  getAllPermissions(accessToken?: string) {
    return http.get<ApiResponse<Permission[]>>(
      '/permissions/get-all-permissions',
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  getPermissionsWithPagination(query?: QueryParams, accessToken?: string) {
    return http.get<ApiResponse<PermissionList>>(
      `/permissions/get-permissions?page=${query?.page || 1}&limit=${query?.limit || PERMISSION_LIMITS}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  getPermissionDetails(id: string, accessToken?: string) {
    return http.get<ApiResponse<Permission>>(
      `/permissions/get-permission-details/${id}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : {}
    )
  },
  addPermission(payload: AddPermissionPayload, accessToken?: string) {
    return http.post<ApiResponse<Permission>>(
      '/permissions/add-permission',
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
  editPermission(payload: AddPermissionPayload, { id, accessToken }: { id: string; accessToken: string }) {
    return http.put<ApiResponse<Permission>>(
      `/permissions/edit-permission/${id}`,
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
  deletePermission(id: string, accessToken?: string) {
    return http.delete<ApiResponse<Permission>>(
      `/permissions/delete-permission/${id}`,
      {},
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

export default permissionService
