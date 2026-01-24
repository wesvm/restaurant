import { type InferSelectModel, relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const paymentMethodEnum = pgEnum('payment_method', ['cash', 'card', 'yape', 'plin'])
export const discountTypeEnum = pgEnum('discount_type', ['percentage', 'fixed'])
export const roleEnum = pgEnum('role', ['admin', 'waiter', 'chef', 'bartender', 'cashier'])
export const orderStatusEnum = pgEnum('order_status', [
  'open',
  'pending',
  'ready',
  'served',
  'paid',
  'cancelled',
])

export const itemStatusEnum = pgEnum('item_status', [
  'pending',
  'cooking',
  'ready',
  'served',
  'issue_reported',
  'cancelled',
])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  employeeCode: text('employee_code').notNull().unique(),
  pin: text('pin').notNull(),
  username: text('username'),
  password: text('password'),
  role: roleEnum('role').default('waiter'),
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const zones = pgTable('zones', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').default('#3b82f6'),
})

export const tables = pgTable('tables', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  zoneId: integer('zone_id').references(() => zones.id),
  capacity: integer('capacity').default(1),
  isActive: boolean('is_active').default(true),
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  isKitchen: boolean('is_kitchen').default(true),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => categories.id),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  isAvailable: boolean('is_available').default(true),
  isTimeService: boolean('is_time_service').default(false),
  trackInventory: boolean('track_inventory').default(false),
  currentStock: integer('current_stock').default(0),
  minStockAlert: integer('min_stock_alert').default(5),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const modifierGroups = pgTable('modifier_groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  productId: integer('product_id').references(() => products.id),
  minSelection: integer('min_selection').default(0),
  maxSelection: integer('max_selection').default(1),
})

export const modifiers = pgTable('modifiers', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id').references(() => modifierGroups.id),
  name: text('name').notNull(),
  priceAdjustment: numeric('price_adjustment', { precision: 10, scale: 2 }).default('0'),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  tableId: integer('table_id').references(() => tables.id),
  mergedTableIds: jsonb('merged_table_ids'),
  waiterId: integer('waiter_id').references(() => users.id),
  numberOfPeople: integer('number_of_people').default(1).notNull(),
  status: orderStatusEnum('status').default('open'),
  serviceStartAt: timestamp('service_start_at'),
  serviceEndAt: timestamp('service_end_at'),
  paymentStatus: text('payment_status').default('unpaid'),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).default('0'),
  discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }).default('0'),
  discountType: discountTypeEnum('discount_type'),
  discountValue: numeric('discount_value', { precision: 10, scale: 2 }),
  discountReason: text('discount_reason'),
  total: numeric('total', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  closedAt: timestamp('closed_at'),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }),
  discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }).default('0'),
  discountType: discountTypeEnum('discount_type'),
  discountValue: numeric('discount_value', { precision: 10, scale: 2 }),
  total: numeric('total', { precision: 10, scale: 2 }),
  status: itemStatusEnum('status').default('pending'),
  notes: text('notes'),
  isPaid: boolean('is_paid').default(false),
  issueReason: text('issue_reason'),
  selectedOptions: jsonb('selected_options'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  method: paymentMethodEnum('method').notNull(),
  reference: text('reference'),
  tip: numeric('tip', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const tablesRelations = relations(tables, ({ one }) => ({
  zone: one(zones, { fields: [tables.zoneId], references: [zones.id] }),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  modifierGroups: many(modifierGroups),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const modifierGroupsRelations = relations(modifierGroups, ({ one, many }) => ({
  product: one(products, {
    fields: [modifierGroups.productId],
    references: [products.id],
  }),
  modifiers: many(modifiers),
}))

export const modifiersRelations = relations(modifiers, ({ one }) => ({
  group: one(modifierGroups, {
    fields: [modifiers.groupId],
    references: [modifierGroups.id],
  }),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  table: one(tables, { fields: [orders.tableId], references: [tables.id] }),
  waiter: one(users, { fields: [orders.waiterId], references: [users.id] }),
  items: many(orderItems),
  payments: many(payments),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, { fields: [payments.orderId], references: [orders.id] }),
}))

export type User = InferSelectModel<typeof users>
export type Zone = InferSelectModel<typeof zones>
export type Table = InferSelectModel<typeof tables>
export type Product = InferSelectModel<typeof products>
export type Category = InferSelectModel<typeof categories>
export type Order = InferSelectModel<typeof orders>
export type OrderItem = InferSelectModel<typeof orderItems>
export type Payment = InferSelectModel<typeof payments>
