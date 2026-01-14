import * as schema from '@restaurant/shared'
import bcrypt from 'bcrypt'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  console.log('🌱 Iniciando Seeding...')
  console.log('🧹 Limpiando datos antiguos...')
  await db.delete(schema.payments)
  await db.delete(schema.orderItems)
  await db.delete(schema.orders)
  await db.delete(schema.tables)
  await db.delete(schema.zones)
  await db.delete(schema.modifiers)
  await db.delete(schema.modifierGroups)
  await db.delete(schema.products)
  await db.delete(schema.categories)
  await db.delete(schema.users)

  console.log('👤 Creando usuarios...')
  const adminPin = await bcrypt.hash('0000', 10)
  const waiterPin = await bcrypt.hash('1234', 10)
  const chefPin = await bcrypt.hash('2345', 10)
  const bartenderPin = await bcrypt.hash('3456', 10)
  const cashierPin = await bcrypt.hash('4567', 10)

  await db.insert(schema.users).values([
    {
      name: 'Administrador',
      employeeCode: 'ADMIN',
      pin: adminPin,
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      name: 'Carlos Mozo',
      employeeCode: 'W001',
      pin: waiterPin,
      role: 'waiter',
    },
    {
      name: 'José Chef',
      employeeCode: 'C001',
      pin: chefPin,
      role: 'chef',
    },
    {
      name: 'Luis Bartender',
      employeeCode: 'B001',
      pin: bartenderPin,
      role: 'bartender',
    },
    {
      name: 'Ana Cajera',
      employeeCode: 'CA001',
      pin: cashierPin,
      role: 'cashier',
    },
  ])
  console.log('📋 Usuarios creados:')
  console.log('  Admin:     ADMIN / PIN: 0000 (o username: admin / password: admin123)')
  console.log('  Mesero:  W001 / PIN: 1234')
  console.log('  Chef:      C001 / PIN: 2345')
  console.log('  Bartender: B001 / PIN: 3456')
  console.log('  Cajero:    CA001 / PIN: 4567')

  console.log('')
  console.log('🍔 Creando categorías...')
  const [catServicios] = await db
    .insert(schema.categories)
    .values({ name: 'Servicios', isKitchen: false })
    .returning()

  const [catBebidas] = await db
    .insert(schema.categories)
    .values({ name: 'Bebidas', isKitchen: false })
    .returning()

  const [catComidas] = await db
    .insert(schema.categories)
    .values({ name: 'Comidas', isKitchen: true })
    .returning()

  const [catEntradas] = await db
    .insert(schema.categories)
    .values({ name: 'Entradas', isKitchen: true })
    .returning()

  console.log('🍽️ Creando productos...')

  await db
    .insert(schema.products)
    .values({
      name: 'Cerveza Pilsen',
      categoryId: catBebidas.id,
      price: '10.00',
      trackInventory: true,
      currentStock: 50,
      minStockAlert: 10,
    })
    .returning()

  const [incaKola] = await db
    .insert(schema.products)
    .values({
      name: 'Inca Kola',
      categoryId: catBebidas.id,
      price: '6.00',
      trackInventory: true,
      currentStock: 30,
      minStockAlert: 10,
    })
    .returning()

  const [incaKolaSizeGroup] = await db
    .insert(schema.modifierGroups)
    .values({
      name: 'Tamaño',
      productId: incaKola.id,
      minSelection: 1,
      maxSelection: 1,
    })
    .returning()

  await db.insert(schema.modifiers).values([
    { groupId: incaKolaSizeGroup.id, name: 'Personal', priceAdjustment: '0.00' },
    { groupId: incaKolaSizeGroup.id, name: '1 Litro', priceAdjustment: '6.00' },
  ])

  const [chichaMorada] = await db
    .insert(schema.products)
    .values({
      name: 'Chicha Morada',
      categoryId: catBebidas.id,
      price: '12.00',
      trackInventory: false,
    })
    .returning()

  const [chichaTypeGroup] = await db
    .insert(schema.modifierGroups)
    .values({
      name: 'Presentación',
      productId: chichaMorada.id,
      minSelection: 1,
      maxSelection: 1,
    })
    .returning()

  await db.insert(schema.modifiers).values([
    { groupId: chichaTypeGroup.id, name: 'Vaso', priceAdjustment: '0.00' },
    { groupId: chichaTypeGroup.id, name: 'Jarra', priceAdjustment: '12.00' },
  ])

  const [limonada] = await db
    .insert(schema.products)
    .values({
      name: 'Limonada',
      categoryId: catBebidas.id,
      price: '12.00',
      trackInventory: false,
    })
    .returning()

  const [limonadaTypeGroup] = await db
    .insert(schema.modifierGroups)
    .values({
      name: 'Presentación',
      productId: limonada.id,
      minSelection: 1,
      maxSelection: 1,
    })
    .returning()

  await db.insert(schema.modifiers).values([
    { groupId: limonadaTypeGroup.id, name: 'Vaso', priceAdjustment: '0.00' },
    { groupId: limonadaTypeGroup.id, name: 'Jarra', priceAdjustment: '10.00' },
  ])

  const [lomoSaltado] = await db
    .insert(schema.products)
    .values({
      name: 'Lomo Saltado',
      categoryId: catComidas.id,
      price: '45.00',
      description: 'Clásico plato peruano con carne, papas fritas y arroz',
      trackInventory: false,
    })
    .returning()

  const [lomoTermGroup] = await db
    .insert(schema.modifierGroups)
    .values({
      name: 'Término de Carne',
      productId: lomoSaltado.id,
      minSelection: 0,
      maxSelection: 1,
    })
    .returning()

  await db.insert(schema.modifiers).values([
    { groupId: lomoTermGroup.id, name: 'Término Medio', priceAdjustment: '0.00' },
    { groupId: lomoTermGroup.id, name: '3/4', priceAdjustment: '0.00' },
    { groupId: lomoTermGroup.id, name: 'Bien Cocido', priceAdjustment: '0.00' },
  ])

  await db.insert(schema.products).values([
    {
      name: 'Ají de Gallina',
      categoryId: catComidas.id,
      price: '38.00',
      trackInventory: false,
    },
    {
      name: 'Ceviche',
      categoryId: catComidas.id,
      price: '42.00',
      trackInventory: false,
    },
  ])

  const [tequeños] = await db
    .insert(schema.products)
    .values({
      name: 'Tequeños',
      categoryId: catEntradas.id,
      price: '18.00',
      trackInventory: true,
      currentStock: 20,
      minStockAlert: 5,
    })
    .returning()

  const [tequeñosCantGroup] = await db
    .insert(schema.modifierGroups)
    .values({
      name: 'Cantidad',
      productId: tequeños.id,
      minSelection: 1,
      maxSelection: 1,
    })
    .returning()

  await db.insert(schema.modifiers).values([
    { groupId: tequeñosCantGroup.id, name: '6 unidades', priceAdjustment: '0.00' },
    { groupId: tequeñosCantGroup.id, name: '12 unidades', priceAdjustment: '14.00' },
  ])

  await db.insert(schema.products).values([
    {
      name: 'Papa a la Huancaína',
      categoryId: catEntradas.id,
      price: '15.00',
      trackInventory: false,
    },
  ])

  await db.insert(schema.products).values([
    {
      name: '1 Hora Billar',
      categoryId: catServicios.id,
      price: '20.00',
      isTimeService: true,
      trackInventory: false,
    },
    {
      name: '1 Hora Ping Pong',
      categoryId: catServicios.id,
      price: '20.00',
      isTimeService: true,
      trackInventory: false,
    },
  ])

  console.log('🎱 Creando zonas y mesas...')

  const [zoneMain] = await db
    .insert(schema.zones)
    .values({
      name: 'Salón Principal',
      color: '#3b82f6',
    })
    .returning()

  const [zoneGames] = await db
    .insert(schema.zones)
    .values({
      name: 'Zona Juegos',
      color: '#10b981',
    })
    .returning()

  const [zoneBarra] = await db
    .insert(schema.zones)
    .values({
      name: 'Barra',
      color: '#f59e0b',
    })
    .returning()

  await db.insert(schema.tables).values([
    { label: 'Mesa 1', zoneId: zoneMain.id, capacity: 4 },
    { label: 'Mesa 2', zoneId: zoneMain.id, capacity: 4 },
    { label: 'Mesa 3', zoneId: zoneMain.id, capacity: 2 },
    { label: 'Mesa 4', zoneId: zoneMain.id, capacity: 6 },
    { label: 'Mesa 5', zoneId: zoneMain.id, capacity: 4 },

    { label: 'Billar 1', zoneId: zoneGames.id, capacity: 4 },
    { label: 'Billar 2', zoneId: zoneGames.id, capacity: 4 },
    { label: 'Ping Pong A', zoneId: zoneGames.id, capacity: 2 },
    { label: 'Ping Pong B', zoneId: zoneGames.id, capacity: 2 },

    { label: 'Barra 1', zoneId: zoneBarra.id, capacity: 4 },
    { label: 'Barra 2', zoneId: zoneBarra.id, capacity: 2 },
  ])

  console.log('')
  console.log('✅ Seeding completado exitosamente.')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Error en seeding:', err)
  process.exit(1)
})
