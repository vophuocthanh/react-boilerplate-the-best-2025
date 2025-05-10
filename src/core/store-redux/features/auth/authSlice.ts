import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type LoginResponse } from '@/models/interface/auth.interface'

import { type AuthState } from './types'

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.access_token = null
      state.refresh_token = null
      state.isAuthenticated = false
      state.error = null
    },
    updateUser: (state, action: PayloadAction<LoginResponse['user']>) => {
      state.user = action.payload
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions
export default authSlice.reducer
