import type { GetProductsQuery } from '@restaurant/shared/validators'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/api/products.api'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (query?: GetProductsQuery) => [...productKeys.lists(), query] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

export function useProducts(query?: GetProductsQuery) {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => productsApi.getAll(query),
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}
