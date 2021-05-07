import { Router } from 'express'

import * as courseController from '../controllers/courses'

const router = Router({ mergeParams: true })

router.route('/').get(courseController.getCourses)

export default router
