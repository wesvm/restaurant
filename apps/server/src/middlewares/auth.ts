import { forbidden, type JWTPayload, unauthorized } from '@restaurant/shared'
import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt'

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    const response = unauthorized('Acceso denegado: token no proporcionado')
    return res.status(response.status).json(response)
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    const response = unauthorized('Token inválido o expirado')
    return res.status(response.status).json(response)
  }

  req.user = decoded
  next()
}

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const response = unauthorized('Usuario no autenticado')
      return res.status(response.status).json(response)
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
      const response = forbidden('No tienes permisos suficientes')
      return res.status(response.status).json(response)
    }

    next()
  }
}
