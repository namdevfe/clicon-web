import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isShowNavMobile: boolean
}

const initialState: AppState = {
  isShowNavMobile: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleShowNavMobile(state) {
      state.isShowNavMobile = true
    },
    handleCloseNavMobile(state) {
      state.isShowNavMobile = false
    }
  }
})

const { reducer: appReducer, actions } = appSlice

export const selectIsShowNavMobile = (state: RootState) => state.app.isShowNavMobile
export const { handleCloseNavMobile, handleShowNavMobile } = actions
export default appReducer
