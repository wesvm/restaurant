import { adminLoginSchema, loginSchema } from '@restaurant/shared'
import { Router } from 'express'
import { getCurrentUser, login, loginAdmin } from '../controllers/auth.controller'
import { authenticateToken } from '../middlewares/auth'
import { validate } from '../middlewares/validate'

const router: Router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/login/admin', validate(adminLoginSchema), loginAdmin)
router.get('/me', authenticateToken, getCurrentUser)

export default router
