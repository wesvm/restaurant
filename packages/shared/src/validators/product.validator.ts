import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Precio inválido'),
  categoryId: z.number().int().positive('Categoría inválida'),
  isAvailable: z.boolean().default(true),
  isTimeService: z.boolean().default(false),
  trackInventory: z.boolean().default(false),
  currentStock: z.number().int().min(0).optional(),
  minStockAlert: z.number().int().min(0).optional(),
})

export const updateProductSchema = createProductSchema.partial()

export const getProductsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  categoryId: z.coerce.number().positive().optional(),
  isAvailable: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  isTimeService: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  trackInventory: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
})

export const productIdParamsSchema = z.object({
  id: z.coerce.number().positive()
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>
export type ProductIdParams = z.infer<typeof productIdParamsSchema>