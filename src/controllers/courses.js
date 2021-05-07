/** @namespace CourseControllers */

import Course from '../models/Course'
import asyncHandler from '../middlewares/async'

/**
 * @async
 * @auth          Public
 * @route         GET /api/v1/courses
 * @route         GET /api/v1/bootcamp/:bootcampId/courses
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get all courses
 * @memberof      CourseControllers
 
 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const getCourses = asyncHandler(async (req, res) => {
  const { bootcampId } = req.query

  const query = bootcampId
    ? Course.find({ bootcamp: bootcampId })
    : Course.find().populate({ path: 'bootcamp', select: 'name description' })

  const courses = await query

  res.status(200).json({ success: true, count: courses.length, data: courses })
})
