'use client'

import tokenMethod from '@/lib/storage'
import authService from '@/services/auth-service'
import { useAppDispatch } from '@/store'
import { setProfile } from '@/store/reducers/authSlice'
import { ApiResponse } from '@/types/global'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const LogoutPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

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
        console.log(error)
      }
    })()
  }, [dispatch, router])

  return null
}

export default LogoutPage
