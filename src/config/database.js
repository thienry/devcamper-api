import chalk from 'chalk'
import mongoose from 'mongoose'

import * as logger from './logger'

async function dbConnection() {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    logger.log.info(
      chalk.yellow.bgGreen.bold(`MongoDB Connected: ${conn.connection.host}`)
    )
  } catch (error) {
    logger.log.error(
      chalk.yellow.bgRed.bold(`MongoDB Could not connect: ${error.message}`)
    )
    process.exit(1)
  }
}

export default dbConnection
