import { products } from '@restaurant/shared/db'
import type {
  ProductsResponse,
  ProductWithCategory,
  ProductWithDetails,
} from '@restaurant/shared/dtos'
import type { GetProductsQuery } from '@restaurant/shared/validators'
import { and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { db } from '../db'
import { AppError } from '../middlewares/error'

export const getAllProducts = async (query: GetProductsQuery): Promise<ProductsResponse> => {
  const {
    page = 1,
    limit = 20,
    search,
    categoryId,
    isAvailable,
    isTimeService,
    trackInventory,
  } = query

  const offset = (page - 1) * limit

  const conditions = []

  if (search) {
    conditions.push(
      or(ilike(products.name, `%${search}%`), ilike(products.description, `%${search}%`))
    )
  }

  if (categoryId !== undefined) {
    conditions.push(eq(products.categoryId, categoryId))
  }

  if (isAvailable !== undefined) {
    conditions.push(eq(products.isAvailable, isAvailable))
  }

  if (isTimeService !== undefined) {
    conditions.push(eq(products.isTimeService, isTimeService))
  }

  if (trackInventory !== undefined) {
    conditions.push(eq(products.trackInventory, trackInventory))
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  const productsList = await db.query.products.findMany({
    where: whereClause,
    with: {
      category: true,
    },
    limit,
    offset,
    orderBy: [desc(products.id)],
  })

  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(whereClause)

  const count = countResult[0]?.count ?? 0
  const totalPages = Math.ceil(count / limit)

  return {
    products: productsList as ProductWithCategory[],
    pagination: {
      page,
      limit,
      total: count,
      totalPages,
    },
  }
}

export const getProductById = async (id: number): Promise<ProductWithDetails> => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      modifierGroups: {
        with: {
          modifiers: true,
        },
      },
    },
  })

  if (!product) {
    throw new AppError(404, 'Producto no encontrado')
  }

  return product as ProductWithDetails
}
