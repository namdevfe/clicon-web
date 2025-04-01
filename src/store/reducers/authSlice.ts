import { RootState } from '@/store'
import { User } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  profile: User | null
}

const initialState: AuthState = {
  profile: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User | null>) {
      state.profile = action.payload
    }
  }
})

const { actions, reducer: authReducer } = authSlice

export const selectProfile = (state: RootState) => state.auth.profile
export const { setProfile } = actions
export default authReducer
