import { z } from 'zod'

export const loginSchema = z.object({
  employeeCode: z
    .string()
    .min(1, 'El código de empleado es requerido')
    .max(10, 'Código demasiado largo')
    .toUpperCase(),
  pin: z
    .string()
    .length(4, 'El PIN debe tener 4 dígitos')
    .regex(/^\d+$/, 'El PIN debe contener solo números'),
})

export const adminLoginSchema = z.object({
  username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres').toLowerCase(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
