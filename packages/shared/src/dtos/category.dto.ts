import type { Category } from '../db/schema'

export interface CategoryWithProductCount extends Category {
  productCount: number
}
