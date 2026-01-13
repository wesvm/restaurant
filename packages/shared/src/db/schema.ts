import type { InferSelectModel } from 'drizzle-orm'
import { numeric, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const productsTable = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
})

export type Product = InferSelectModel<typeof productsTable>
