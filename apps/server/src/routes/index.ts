import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth'
import authRouter from './auth.router'
import productRouter from './product.router'

const router: Router = Router()

router.use('/auth', authRouter)
router.use('/products', authenticateToken, productRouter)

export default router
