import { Router } from 'express'

import * as courseController from '../controllers/courses'

const router = Router({ mergeParams: true })

router
  .route('/')
  .get(courseController.getCourses)
  .post(courseController.createBootcamp)

router
  .route('/:id')
  .get(courseController.getCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse)

export default router
