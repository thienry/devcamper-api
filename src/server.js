import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

import * as logger from './config/logger'
import baseUri from './constants/baseUri'
import environment from './constants/config'
import bootcampRoutes from './routes/bootcamps'

const PORT = process.env.APP_PORT || 5000
const HOST = process.env.APP_HOSTNAME || 'http://localhost'
const URI = process.env.APP_BASEURI || '/api/v1'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === environment.development) {
  app.use(morgan(environment.development))
}

// routes
app.use(baseUri.bootcampsUri, bootcampRoutes)

app.get(`${URI}`, (req, res) =>
  res.status(200).json({ message: 'DevCamper API' })
)

app.listen(PORT, () =>
  logger.log.info(`API has been started... click => ${HOST}:${PORT}${URI}`)
)

app.on('error', (error) => {
  logger.log.error(error.message)
  app.close(() => process.exit(1))
})
