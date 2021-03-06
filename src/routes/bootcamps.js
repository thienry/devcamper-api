import { Router } from 'express'

import courseRouter from './courses'
import Bootcamp from '../models/Bootcamp'
import advancedResults from '../middlewares/advancedResults'
import * as bootcampController from '../controllers/bootcamps'

const router = Router()

router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp)

router
  .route('/:id')
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp)

router
  .route('/radius/:zipcode/:distance')
  .get(bootcampController.getBootcampsInRadius)

router.route(':id/photo').get(bootcampController.bootcampPhotoUpload)

export default router
