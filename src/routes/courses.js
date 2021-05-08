import { Router } from 'express'

import Course from '../model/course'
import * as courseController from '../controllers/courses'
import advancedResults from '../middlewares/advancedResults'

const router = Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    courseController.getCourses
  )
  .post(courseController.createCourse)

router
  .route('/:id')
  .get(courseController.getCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse)

export default router
