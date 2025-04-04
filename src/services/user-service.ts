import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { AddUserPayload, EditUserPayload, User } from '@/types/user'

const userService = {
  getUsers(accessToken?: string) {
    return http.get<ApiResponse<User[]>>('/users/get-all-users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getUserDetails(id: string, accessToken?: string) {
    return http.get<ApiResponse<User>>(`/users/get-user-details/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  addUser(payload: AddUserPayload, accessToken?: string) {
    return http.post<ApiResponse<undefined>>('/users/add-user', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  editUser(payload: EditUserPayload, { id, accessToken }: { id: string; accessToken: string }) {
    return http.put<ApiResponse<User>>(`/users/edit-user/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userService
