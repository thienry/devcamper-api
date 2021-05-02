import chalk from 'chalk'
import dotenv from 'dotenv'
import { resolve } from 'path'
import mongoose from 'mongoose'
import { readFileSync } from 'fs'

import Bootcamp from './src/models/Bootcamp'
import * as logger from './src/config/logger'

dotenv.config({ path: './.env' })

mongoose.connect(process.env.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const bootcamps = JSON.parse(
  readFileSync(resolve(__dirname, '_data', 'bootcamps.json'), 'utf-8')
)

async function importData() {
  try {
    await Bootcamp.create(bootcamps)
    logger.log.info(chalk.yellow.bgGreen.bold('Data Imported...'))
    process.exit()
  } catch (error) {
    logger.log.error(chalk.yellow.bgRed.bold(error))
  }
}

async function deleteData() {
  try {
    await Bootcamp.deleteMany()
    logger.log.info(chalk.white.bgRed.bold('Data Destroyed...'))
    process.exit()
  } catch (error) {
    logger.log.error(chalk.white.bgRed.bold(error))
  }
}

if (process.argv[4] === '-i') importData()
if (process.argv[4] === '-d') deleteData()
