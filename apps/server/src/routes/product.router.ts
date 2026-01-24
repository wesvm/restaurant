import { getProductsQuerySchema, productIdParamsSchema } from '@restaurant/shared'
import { Router } from 'express'
import { getAll, getById } from '../controllers/product.controller'
import { validate } from '../middlewares/validate'

const router: Router = Router()

router.get('/', validate({ query: getProductsQuerySchema }), getAll)
router.get('/:id', validate({ params: productIdParamsSchema }), getById)

export default router
