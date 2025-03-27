'use client'

import authService from '@/services/auth-service'
import { useEffect } from 'react'

const Profile = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const profile = await authService.getProfileClient()
        console.log('🚀profile---->', profile)
      } catch (error: any) {
        console.log('🚀error---->', error)
      }
    })()
  }, [])

  return <div>Profile</div>
}

export default Profile
