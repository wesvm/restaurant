import type { Category, Product } from '../db/schema'

export interface ProductWithCategory extends Product {
  category: Category | null
}

export interface ProductsResponse {
  products: ProductWithCategory[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ProductWithDetails extends Product {
  category: Category | null
  modifierGroups: Array<{
    id: number
    name: string
    minSelection: number
    maxSelection: number
    modifiers: Array<{
      id: number
      name: string
      priceAdjustment: string
    }>
  }>
}
