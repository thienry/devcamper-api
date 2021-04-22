import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
