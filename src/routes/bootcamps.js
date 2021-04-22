import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

router.post('/', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

export default router
