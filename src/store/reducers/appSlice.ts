import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isShowNavMobile: boolean
  isShowDiscount: boolean
}

const initialState: AppState = {
  isShowNavMobile: false,
  isShowDiscount: true
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
    },
    handleCloseDiscount(state) {
      state.isShowDiscount = false
    }
  }
})

const { reducer: appReducer, actions } = appSlice

export const selectIsShowNavMobile = (state: RootState) => state.app.isShowNavMobile
export const selectIsShowDiscount = (state: RootState) => state.app.isShowDiscount

export const { handleCloseNavMobile, handleShowNavMobile, handleCloseDiscount } = actions
export default appReducer
