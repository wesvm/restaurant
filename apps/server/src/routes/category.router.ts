import { getCategoriesQuerySchema, idParamsSchema } from '@restaurant/shared/validators'
import { Router } from 'express'
import { getAll, getById } from '../controllers/category.controller'
import { validate } from '../middlewares/validate'

const router: Router = Router()

router.get('/', validate({ query: getCategoriesQuerySchema }), getAll)
router.get('/:id', validate({ params: idParamsSchema }), getById)

export default router
