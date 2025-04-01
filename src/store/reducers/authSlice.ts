import tokenMethod from '@/lib/storage'
import authService from '@/services/auth-service'
import { RootState } from '@/store'
import { Login } from '@/types/auth'
import { User } from '@/types/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  profile: User | null
  isLoading: {
    profile: boolean
  }
}

const initialState: AuthState = {
  profile: null,
  isLoading: {
    profile: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User | null>) {
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading.profile = true
    })
    builder.addCase(getProfile.fulfilled, (state, action: any) => {
      state.isLoading.profile = false
      state.profile = action.payload
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading.profile = false
      state.profile = null
    })
  }
})

const { actions, reducer: authReducer } = authSlice

export const selectProfile = (state: RootState) => state.auth.profile
export const { setProfile } = actions
export default authReducer

// Async actions
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const getProfile = createAsyncThunk('/auth/getProfile', async (_, thunkAPI) => {
  const token = tokenMethod.get() as Login

  if (token.accessToken) {
    try {
      const response = await authService.getProfile()
      return response?.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
})
