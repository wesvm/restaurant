import 'dotenv/config'
import cors from 'cors'
import express, { type Request, type Response } from 'express'

//import './db/seed'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript + pnpm is running!' })
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
