import http from '@/shared/lib/http'
import { AuthPayload, Login, LoginPayload } from '@/types/auth'
import { ApiResponse } from '@/types/global'

const authService = {
  login(payload: LoginPayload) {
    return http.post<ApiResponse<Login>>('/auth/login', payload)
  },
  // Api auth of next server
  auth(payload: AuthPayload) {
    return http.post('/api/auth', payload, {
      baseURL: ''
    })
  },
  getProfile(accessToken: string) {
    return http.get('/auth/get-profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getProfileClient() {
    return http.get('/auth/get-profile')
  }
}

export default authService
