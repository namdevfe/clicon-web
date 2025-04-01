'use client'

import { useAppSelector } from '@/store'
import { selectProfile } from '@/store/reducers/authSlice'
import { User } from '@/types/user'
import { useEffect, useState } from 'react'

const Profile = () => {
  const profile = useAppSelector(selectProfile)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (profile) setUser(profile)
  }, [profile])

  return <div>{`Hello, ${user?.email}`}</div>
}

export default Profile
