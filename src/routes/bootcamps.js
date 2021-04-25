import { Router } from 'express'

import * as bootcampController from '../controllers/bootcamps'

const router = Router()

router
  .route('/')
  .get(bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp)

router
  .route('/:id')
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp)

export default router
