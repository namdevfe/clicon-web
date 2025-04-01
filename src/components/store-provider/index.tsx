'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store'
import { increment } from '@/store/reducers/counterSlice'
import { STORAGE } from '@/constants/storage'
import { isClient } from '@/lib/http'
import { setProfile } from '@/store/reducers/authSlice'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  const profile = isClient ? JSON.parse(localStorage.getItem(STORAGE.PROFILE) as string) : null
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(increment())
    storeRef.current.dispatch(setProfile(profile))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
