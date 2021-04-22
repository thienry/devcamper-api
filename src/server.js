import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

import { log } from './config/logger'
import bootcampRoutes from './routes/bootcamps'
import environment from './constants/config'
import baseUri from './constants/baseUri'

const app = express()
const PORT = process.env.PORT || 5000

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === environment.development) {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  )
}

// routes
app.use(baseUri.bootcampsUri, bootcampRoutes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => log.info(`Listening on port: ${PORT}`))

app.on('error', (error) => {
  log.error(error.message)
  app.close(() => process.exit(1))
})
