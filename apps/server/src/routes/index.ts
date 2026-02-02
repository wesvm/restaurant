import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth'
import authRouter from './auth.router'
import categoryRouter from './category.router'
import productRouter from './product.router'

const router: Router = Router()

router.use('/auth', authRouter)
router.use('/products', authenticateToken, productRouter)
router.use('/categories', authenticateToken, categoryRouter)

export default router
