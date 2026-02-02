import type { GetCategoriesQuery } from '@restaurant/shared/validators'
import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/api/categories.api'

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (query?: GetCategoriesQuery) => [...categoryKeys.lists(), query] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
  products: (id: number) => [...categoryKeys.detail(id), 'products'] as const,
}

export function useCategories(query?: GetCategoriesQuery) {
  return useQuery({
    queryKey: categoryKeys.list(query),
    queryFn: () => categoriesApi.getAll(query),
  })
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  })
}
