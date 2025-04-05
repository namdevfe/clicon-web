import { USER_LIMITS } from '@/constants/pagination'
import http from '@/lib/http'
import { ApiResponse, QueryParams } from '@/types/global'
import { AddUserPayload, EditUserPayload, User, UserList } from '@/types/user'

const userService = {
  getUsers(accessToken?: string) {
    return http.get<ApiResponse<User[]>>('/users/get-all-users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getUsersWithPagination(query?: QueryParams, accessToken?: string) {
    return http.get<ApiResponse<UserList>>(
      `/users/get-users?page=${query?.page}&limit=${query?.limit || USER_LIMITS}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
  },
  deleteUser(id: string, accessToken?: string) {
    return http.delete<ApiResponse<User>>(`/users/delete-user/${id}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userService
