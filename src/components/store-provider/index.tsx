'use client'

import { isClient } from '@/lib/http'
import tokenMethod from '@/lib/storage'
import { AppStore, makeStore } from '@/store'
import { getProfile } from '@/store/reducers/authSlice'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  const token = isClient ? tokenMethod.get() : null

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

    if (token) {
      storeRef.current.dispatch(getProfile())
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
