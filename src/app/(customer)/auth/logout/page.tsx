'use client'

import tokenMethod from '@/lib/storage'
import authService from '@/services/auth-service'
import { useAppDispatch } from '@/store'
import { setProfile } from '@/store/reducers/authSlice'
import { ApiResponse } from '@/types/global'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const LogoutPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = (await authService.logoutFromNextServer()) as ApiResponse
        if (response?.statusCode === StatusCodes.OK) {
          tokenMethod.remove()
          dispatch(setProfile(null))
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
