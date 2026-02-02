import type { Category } from '@restaurant/shared/db'
import type { CategoryWithProductCount } from '@restaurant/shared/dtos'
import type { GetCategoriesQuery } from '@restaurant/shared/validators'
import { api } from '@/lib/api/client'

export const categoriesApi = {
  getAll: (query?: GetCategoriesQuery) =>
    api.get<CategoryWithProductCount[]>('/categories', { params: query }),

  getById: (id: number) => api.get<Category>(`/categories/${id}`),
}
