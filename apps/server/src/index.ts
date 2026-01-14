import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/error'
import router from './routes'

//import './db/seed'

const app = express()
const PORT = process.env.PORT || 3000
app.disable('x-powered-by')
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
