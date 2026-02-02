import { error, serverError } from '@restaurant/shared/utils'
import type { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(error(err.message, err.statusCode))
  }

  if (err.message) {
    return res.status(400).json(error(err.message))
  }

  res.status(500).json(serverError())
}
