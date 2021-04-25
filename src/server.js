import 'dotenv/config'
import cors from 'cors'
import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'

import baseUri from './constants/baseUri'
import * as logger from './config/logger'
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

async function initRoutes() {
  try {
    app.use(baseUri.bootcampsUri, bootcampRoutes)

    app.get(`${URI}`, (req, res) =>
      res.status(200).json({ message: 'DevCamper API' })
    )
  } catch (error) {
    mongoose.connection.close()

    logger.log.error(
      chalk.yellow.bgRed.bold(`Server failed to start - ${error}`)
    )
    logger.log.info(
      chalk.yellow.bgCyan.bold('MongoDB connection was closed...')
    )

    process.exit(1)
  }
}

async function bootstrap() {
  await dbConnection()
  await initRoutes()

  app.listen(PORT, () =>
    logger.log.info(
      chalk.yellow.bgGreen.bold(
        `Server has been started... click => ${HOST}:${PORT}${URI}`
      )
    )
  )
}

bootstrap()
