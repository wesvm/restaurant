import { validationError } from '@restaurant/shared'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
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
