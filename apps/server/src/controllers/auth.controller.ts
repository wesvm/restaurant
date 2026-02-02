import { notFound, success, unauthorized } from '@restaurant/shared/utils'
import type { AdminLoginInput, LoginInput } from '@restaurant/shared/validators'
import type { NextFunction, Request, Response } from 'express'
import { getUserById, loginWithPassword, loginWithPin } from '../services/auth.service'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.validated?.body as LoginInput
    const result = await loginWithPin(data)

    const response = success(`Bienvenido ${result.user.name}`, result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.validated?.body as AdminLoginInput
    const result = await loginWithPassword(data)

    const response = success(`Bienvenido ${result.user.name}`, result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const logout = async (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json(success('Sesión cerrada exitosamente', null))
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      const response = unauthorized()
      return res.status(response.status).json(response)
    }

    const user = await getUserById(req.user.userId)

    if (!user) {
      const response = notFound('Usuario no encontrado')
      return res.status(response.status).json(response)
    }

    const response = success('Usuario obtenido exitosamente', {
      id: user.id,
      name: user.name,
      employeeCode: user.employeeCode,
      role: user.role,
    })

    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}
