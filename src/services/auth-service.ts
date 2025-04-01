import http from '@/lib/http'
import {
  AuthPayload,
  EmailVerificationPayload,
  Login,
  LoginPayload,
  LogoutPayload,
  RegisterPayload
} from '@/types/auth'
import { ApiResponse } from '@/types/global'
import { User } from '@/types/user'

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
  getProfile() {
    return http.get<ApiResponse<User>>('/auth/get-profile')
  },
  setProfileToNextServer(payload: User) {
    return http.post('/api/auth/profile', payload, {
      baseURL: ''
    })
  },
  logout(payload: LogoutPayload) {
    return http.put<ApiResponse<undefined>>('/auth/logout', payload)
  },
  logoutFromNextServer() {
    return http.put(
      '/api/auth/logout',
      {},
      {
        baseURL: ''
      }
    )
  }
}

export default authService
