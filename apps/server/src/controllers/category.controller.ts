import { success } from '@restaurant/shared/utils'
import type { GetCategoriesQuery, IdParams } from '@restaurant/shared/validators'
import type { NextFunction, Request, Response } from 'express'
import { getAllCategories, getCategoryById } from '../services/category.service'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.validated?.query as GetCategoriesQuery
    const result = await getAllCategories(query)

    const response = success('Categorías obtenidas exitosamente', result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validated?.params as IdParams
    const result = await getCategoryById(id)

    const response = success('Categoría obtenida exitosamente', result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}
