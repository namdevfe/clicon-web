'use client'

import authService from '@/services/auth-service'
import { ApiResponse } from '@/types/global'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const LogoutPage = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const response = (await authService.logoutFromNextServer()) as ApiResponse<undefined>
        if (response?.statusCode === StatusCodes.OK) {
          toast.success('Logout is successfully.')
        }
      } catch (error: any) {
        toast.error(error?.message)
      }
    })()
  }, [])

  return null
}

export default LogoutPage
