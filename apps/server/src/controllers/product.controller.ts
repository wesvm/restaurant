import { type GetProductsQuery, type ProductIdParams, success } from '@restaurant/shared'
import type { NextFunction, Request, Response } from 'express'
import { getAllProducts, getProductById } from '../services/product.service'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.validated?.query as GetProductsQuery
    const result = await getAllProducts(query)

    const response = success('Productos obtenidos exitosamente', result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validated?.params as ProductIdParams
    const result = await getProductById(id)

    const response = success('Producto obtenido exitosamente', result)
    return res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}
