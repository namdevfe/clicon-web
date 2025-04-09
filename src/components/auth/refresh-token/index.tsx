'use client'

import tokenMethod from '@/lib/storage'
import { JWTPayload, Login } from '@/types/auth'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import authService from '@/services/auth-service'

const FIVE_MINUTES = 5 * 60 * 1000

const RefreshToken = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = Date.now()
      const token = tokenMethod.get() as Login
      const decode = jwt.decode(token.accessToken) as JWTPayload
      const accessTokenExpiresAt = decode.exp * 1000
      const timeLeft = accessTokenExpiresAt - now
      if (timeLeft < FIVE_MINUTES) {
        // Refresh token
        const response = await authService.refreshToken({ refreshToken: token.refreshToken })
        if (!!response?.data) {
          // Set token to localStorage
          tokenMethod.set(response.data)

          // Set token to next server
          await authService.auth(response.data)
        }
      }
    }, 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  return null
}

export default RefreshToken
