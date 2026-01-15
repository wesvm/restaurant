import {
  type AdminLoginInput,
  type LoginInput,
  notFound,
  success,
  unauthorized,
} from '@restaurant/shared'
import type { NextFunction, Request, Response } from 'express'
import { getUserById, loginWithPassword, loginWithPin } from '../services/auth.service'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: LoginInput = req.body
    const result = await loginWithPin(data)

    const response = success(`Bienvenido ${result.user.name}`, result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: AdminLoginInput = req.body
    const result = await loginWithPassword(data)

    const response = success(`Bienvenido ${result.user.name}`, result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
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
