import type { User } from '../db/schema'

export interface AuthResponse {
  user: {
    id: number
    name: string
    employeeCode: string
    role: User['role']
  }
  token: string
}

export interface JWTPayload {
  userId: number
  role: User['role']
  iat?: number
  exp?: number
}
