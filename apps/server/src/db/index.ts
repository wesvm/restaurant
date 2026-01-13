import { drizzle } from 'drizzle-orm/node-postgres'
import { productsTable } from '@restaurant/shared'

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  const product: typeof productsTable.$inferInsert = {
    name: 'Sample Product',
    price: '19.99',
  };
  //await db.insert(productsTable).values(product);
  console.log('New product created!')
  const products = await db.select().from(productsTable);
  console.log('Getting all products from the database: ', products);

}

main()

export default db