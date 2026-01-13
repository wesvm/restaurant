import 'dotenv/config'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import './db/index'
import { productsTable } from '@restaurant/shared/dist/db/schema'
import db from './db/index'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript + pnpm is running!' })
});

app.get('/api/products', async (_req: Request, res: Response) => {
  const products = await db.select().from(productsTable);
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
});
