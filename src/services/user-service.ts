import http from '@/lib/http'
import { ApiResponse } from '@/types/global'
import { AddUserPayload, User } from '@/types/user'

const userService = {
  getUsers(accessToken?: string) {
    return http.get<ApiResponse<User[]>>('/users/get-all-users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  addUser(payload: AddUserPayload) {
    return http.post<ApiResponse<undefined>>('/users/add-user', payload)
  }
}

export default userService
