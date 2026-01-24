import { adminLoginSchema, loginSchema } from '@restaurant/shared'
import { Router } from 'express'
import { getCurrentUser, login, loginAdmin, logout } from '../controllers/auth.controller'
import { authenticateToken } from '../middlewares/auth'
import { validate } from '../middlewares/validate'

const router: Router = Router()

router.post('/login', validate({ body: loginSchema }), login)
router.post('/login/admin', validate({ body: adminLoginSchema }), loginAdmin)
router.post('/logout', authenticateToken, logout)
router.get('/me', authenticateToken, getCurrentUser)

export default router
