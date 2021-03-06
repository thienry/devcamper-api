import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import fileupload from 'express-fileupload'

import baseUri from './constants/baseUri'
import * as logger from './config/logger'
import courseRoutes from './routes/courses'
import environment from './constants/config'
import dbConnection from './config/database'
import bootcampRoutes from './routes/bootcamps'
import errorHandler from './middlewares/errorHandler'

const PORT = process.env.APP_PORT || 5000
const URI = process.env.APP_BASEURI || '/api/v1'
const HOST = process.env.APP_HOSTNAME || 'http://localhost'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === environment.development) {
  app.use(morgan(environment.development))
}

app.use(fileupload())
app.use(express.static(path.join(__dirname, 'public')))

async function initRoutes() {
  try {
    app.use(baseUri.bootcampsUri, bootcampRoutes)
    app.use(baseUri.courseUri, courseRoutes)

    app.get(`${URI}`, (req, res) =>
      res.status(200).json({ message: 'DevCamper API' })
    )

    app.use(errorHandler)
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
