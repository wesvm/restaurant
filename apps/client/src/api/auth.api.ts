import type { AuthResponse } from '@restaurant/shared/dtos'
import type { AdminLoginInput, LoginInput } from '@restaurant/shared/validators'
import { api } from '@/lib/api/client'

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login', data),

  loginAdmin: async (data: AdminLoginInput): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login/admin', data),

  getCurrentUser: async () => api.get<AuthResponse['user']>('/auth/me'),

  logout: async (): Promise<void> => api.post('/auth/logout'),
}
