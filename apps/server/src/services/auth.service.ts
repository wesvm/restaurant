import { type AuthResponse, type LoginInput, type User, users } from '@restaurant/shared'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import db from '../db'
import { AppError } from '../middlewares/error'
import { signToken } from '../utils/jwt'

export const loginWithPin = async (data: LoginInput): Promise<AuthResponse> => {
  const [user] = await db.select().from(users).where(eq(users.employeeCode, data.employeeCode))

  if (!user) {
    throw new AppError(401, 'Código de empleado incorrecto')
  }

  if (!user.isActive) {
    throw new AppError(403, 'Usuario inactivo. Contacta al administrador')
  }

  if (!user.pin) {
    throw new AppError(400, 'Usuario sin PIN configurado')
  }

  const isPinValid = await bcrypt.compare(data.pin, user.pin)

  if (!isPinValid) {
    throw new AppError(401, 'Credenciales incorrectas')
  }

  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id))

  const token = signToken({ userId: user.id, role: user.role })

  return {
    user: {
      id: user.id,
      name: user.name,
      employeeCode: user.employeeCode,
      role: user.role,
    },
    token,
  }
}

export const getUserById = async (userId: number): Promise<User | undefined> => {
  return db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .then(([user]) => user)
}
