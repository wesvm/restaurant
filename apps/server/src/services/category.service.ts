import { type Category, categories, products } from '@restaurant/shared/db'
import type { CategoryWithProductCount } from '@restaurant/shared/dtos'
import type { GetCategoriesQuery } from '@restaurant/shared/validators'
import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { AppError } from '../middlewares/error'

export const getAllCategories = async (
  query: GetCategoriesQuery
): Promise<CategoryWithProductCount[]> => {
  const { isKitchen } = query
  const whereClause = isKitchen !== undefined ? eq(categories.isKitchen, isKitchen) : undefined

  const categoriesList = await db
    .select({
      id: categories.id,
      name: categories.name,
      isKitchen: categories.isKitchen,
      productCount: sql<number>`count(${products.id})::int`,
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId))
    .where(whereClause)
    .groupBy(categories.id)
    .orderBy(categories.name)

  return categoriesList
}

export const getCategoryById = async (id: number): Promise<Category> => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
  })

  if (!category) {
    throw new AppError(404, 'Categoría no encontrada')
  }

  return category
}
