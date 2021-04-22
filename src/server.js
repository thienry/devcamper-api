import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

import { log } from './config/logger'
import environment from './constants/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.disable('x-powered-by')

if (process.env.NODE_ENV === environment.development) {
  app.use(morgan('combined'))
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => log.info(`Listening on port: ${PORT}`))

app.on('error', (error) => {
  log.error(error.message)
  app.close(() => process.exit(1))
})
