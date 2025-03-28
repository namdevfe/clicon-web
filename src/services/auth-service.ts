import http from '@/lib/http'
import { AuthPayload, EmailVerificationPayload, Login, LoginPayload, RegisterPayload } from '@/types/auth'
import { ApiResponse } from '@/types/global'

const authService = {
  login(payload: LoginPayload) {
    return http.post<ApiResponse<Login>>('/auth/login', payload)
  },
  register(payload: RegisterPayload) {
    return http.post<ApiResponse<undefined>>('/auth/register', payload)
  },
  verifyEmail(payload: EmailVerificationPayload) {
    return http.post<ApiResponse<undefined>>('/auth/verify-otp', payload)
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
