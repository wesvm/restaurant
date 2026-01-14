import type { ApiResponse } from '../types/api.types'

/**
 * Respuesta exitosa
 */
export const success = <T>(
  message: string = 'Operación exitosa',
  data: T,
  status: number = 200
): ApiResponse<T> => {
  return {
    status,
    message,
    data,
  }
}

/**
 * Error de validación
 */
export const validationError = (
  message: string = 'Errores de validación',
  errors: Record<string, string[]>
): ApiResponse => {
  return {
    status: 400,
    message,
    errors,
  }
}

/**
 * Error no autorizado
 */
export const unauthorized = (message: string = 'Acceso no autorizado'): ApiResponse => {
  return {
    status: 401,
    message,
  }
}

/**
 * Error prohibido
 */
export const forbidden = (message: string = 'No tienes permisos para esta acción'): ApiResponse => {
  return {
    status: 403,
    message,
  }
}

/**
 * Recurso no encontrado
 */
export const notFound = (message: string = 'Recurso no encontrado'): ApiResponse => {
  return {
    status: 404,
    message,
  }
}

/**
 * Error del servidor
 */
export const serverError = (message: string = 'Error interno del servidor'): ApiResponse => {
  return {
    status: 500,
    message,
  }
}

/**
 * Error genérico
 */
export const error = (
  message: string,
  status: number = 400,
  errors?: Record<string, string[]>
): ApiResponse => {
  const response: ApiResponse = {
    status,
    message,
  }

  if (errors !== undefined) {
    response.errors = errors
  }

  return response
}

/**
 * Recurso creado exitosamente
 */
export const created = <T>(
  data: T,
  message: string = 'Recurso creado exitosamente'
): ApiResponse<T> => {
  return {
    status: 201,
    message,
    data,
  }
}

/**
 * Sin contenido (operación exitosa sin data)
 */
export const noContent = (message: string = 'Operación exitosa'): ApiResponse => {
  return {
    status: 204,
    message,
  }
}
