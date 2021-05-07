import { Router } from 'express'

import * as courseController from '../controllers/courses'

const router = Router({ mergeParams: true })

router
  .route('/')
  .get(courseController.getCourses)
  .post(courseController.createBootcamp)

router.route('/:id').get(courseController.getCourse)

export default router
