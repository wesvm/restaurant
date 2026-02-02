import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  isKitchen: z.boolean().default(true),
})

export const updateCategorySchema = createCategorySchema.partial()

export const getCategoriesQuerySchema = z.object({
  isKitchen: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>
