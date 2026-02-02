import type { ProductsResponse, ProductWithDetails } from '@restaurant/shared/dtos'
import type { GetProductsQuery } from '@restaurant/shared/validators'
import { api } from '@/lib/api/client'

export const productsApi = {
  getAll: (query?: GetProductsQuery) => api.get<ProductsResponse>('/products', { params: query }),

  getById: (id: number) => api.get<ProductWithDetails>(`/products/${id}`),
}
