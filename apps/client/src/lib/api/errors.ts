import type { ApiResponse } from '@restaurant/shared'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { authStorage } from '../auth-storage'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export const handleApiError = (error: unknown): ApiError => {
  if (!(error instanceof AxiosError)) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    toast.error('Error', { description: message })

    return {
      message,
      code: 'UNKNOWN_ERROR',
    }
  }

  const axiosError = error as AxiosError<ApiResponse>
  const status = axiosError.response?.status
  const errorData = axiosError.response?.data

  if (!axiosError.response) {
    if (axiosError.code === 'ECONNABORTED') {
      toast.error('Tiempo de espera agotado', {
        description: 'El servidor tardó demasiado en responder',
      })
      return {
        message: 'Tiempo de espera agotado',
        code: 'TIMEOUT',
      }
    }

    if (axiosError.code === 'ERR_NETWORK' || !navigator.onLine) {
      toast.error('Error de conexión', {
        description: 'No se pudo conectar con el servidor. Verifica tu conexión.',
      })
      return {
        message: 'Error de conexión',
        code: 'NETWORK_ERROR',
      }
    }

    toast.error('Error', {
      description: axiosError.message || 'Error al comunicarse con el servidor',
    })
    return {
      message: axiosError.message || 'Error de red',
      code: 'NETWORK_ERROR',
    }
  }

  switch (status) {
    case 401: {
      const message = errorData?.message?.toLowerCase() || ''

      if (message.includes('incorrecto') || message.includes('incorrectas')) {
        toast.error('Credenciales inválidas')

        return {
          message: errorData?.message || 'Credenciales inválidas',
          status,
          code: 'INVALID_CREDENTIALS',
        }
      }

      authStorage.clear()

      toast.error('Sesión expirada', {
        description: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)

      return {
        message: errorData?.message || 'Sesión expirada',
        status,
        code: 'SESSION_EXPIRED',
      }
    }

    case 403:
      toast.error('Acceso denegado', {
        description: errorData?.message || 'No tienes permisos para realizar esta acción',
      })

      return {
        message: errorData?.message || 'Acceso denegado',
        status,
        code: 'FORBIDDEN',
      }

    case 404:
      toast.error('El recurso solicitado no existe')

      return {
        message: errorData?.message || 'Recurso no encontrado',
        status,
        code: 'NOT_FOUND',
      }

    case 500:
      toast.error('Error del servidor', {
        description: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
      })

      return {
        message: 'Error interno del servidor',
        status,
        code: 'SERVER_ERROR',
      }

    default:
      toast.error(errorData?.message)

      return {
        message: errorData?.message || 'Error inesperado',
        status,
        code: 'API_ERROR',
      }
  }
}
