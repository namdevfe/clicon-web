'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store'
// import { STORAGE } from '@/constants/storage'
// import { isClient } from '@/lib/http'
// import { setProfile } from '@/store/reducers/authSlice'
// import tokenMethod from '@/lib/storage'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch(setProfile(profile))
  }

  // useEffect(() => {
  //   if (isClient) {
  //     const token = tokenMethod.get()

  //   }
  // }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
