import { loginSchema } from '@restaurant/shared'
import { Router } from 'express'
import { getCurrentUser, login } from '../controllers/auth.controller'
import { authenticateToken } from '../middlewares/auth'
import { validate } from '../middlewares/validate'

const router: Router = Router()

router.post('/login', validate(loginSchema), login)
router.get('/me', authenticateToken, getCurrentUser)

export default router
