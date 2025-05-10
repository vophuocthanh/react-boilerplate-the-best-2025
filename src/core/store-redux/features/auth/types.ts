import { type LoginResponse } from '@/models/interface/auth.interface'

export interface AuthState {
  user: LoginResponse['user'] | null
  access_token: string | null
  refresh_token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
