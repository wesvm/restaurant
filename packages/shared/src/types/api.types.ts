export interface ApiResponse<T = any> {
  status: number
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export type SuccessResponse<T> = {
  status: number
  message: string
  data: T
}

export type ErrorResponse = {
  status: number
  message: string
  errors?: Record<string, string[]>
}
