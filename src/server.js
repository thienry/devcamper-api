import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'

import * as logger from './config/logger'
import baseUri from './constants/baseUri'
import environment from './constants/config'
import dbConnection from './config/database'
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
async function initRoutes() {
  app.use(baseUri.bootcampsUri, bootcampRoutes)

  app.get(`${URI}`, (req, res) =>
    res.status(200).json({ message: 'DevCamper API' })
  )
}

async function bootstrap() {
  await dbConnection().catch((error) => {
    logger.log.error(`MongoDB Could not connect: ${error.message}`)
    process.exit(1)
  })

  await initRoutes().catch(async (error) => {
    mongoose.connection.close()

    logger.log.info('MongoDB connection was closed...')
    logger.log.error(`Server failed to start - ${error}`)

    process.exit(1)
  })

  app.listen(PORT, () =>
    logger.log.info(`Server has been started... click => ${HOST}:${PORT}${URI}`)
  )
}

bootstrap()
