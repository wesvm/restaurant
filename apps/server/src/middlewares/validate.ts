import { validationError } from '@restaurant/shared/utils'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: any
        query?: any
        params?: any
      }
    }
  }
}

type ValidationOptions = {
  body?: z.ZodSchema
  params?: z.ZodSchema
  query?: z.ZodSchema
}

export const validate = (schemas: ValidationOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validated = {}

      if (schemas.body) {
        req.validated.body = await schemas.body.parseAsync(req.body)
        req.body = req.validated.body
      }

      if (schemas.params) {
        req.validated.params = await schemas.params.parseAsync(req.params)
      }

      if (schemas.query) {
        req.validated.query = await schemas.query.parseAsync(req.query)
      }

      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = z.flattenError(error)
        return res.status(400).json(validationError('Errores de validación', errors.fieldErrors))
      }
      next(error)
    }
  }
}
