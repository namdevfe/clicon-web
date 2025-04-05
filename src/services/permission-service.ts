import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { Permission } from '@/types/permission'

const permissionService = {
  getAllPermissions(accessToken?: string) {
    return http.get<ApiResponse<Permission[]>>('/permissions/get-all-permissions', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default permissionService
