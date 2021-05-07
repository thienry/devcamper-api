/** @namespace CourseControllers */

import Course from '../models/Course'
import Bootcamp from '../models/Bootcamp'
import asyncHandler from '../middlewares/async'
import { ErrorResponse } from '../utils/ErrorResponse'

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

/**
 * @async
 * @auth          Public
 * @route         GET /api/v1/courses
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get single course
 * @memberof      CourseControllers
 
 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const getCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id

  const course = await Course.find(courseId).populate({
    path: 'bootcamp',
    select: 'name description'
  })

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${courseId}`), 404)
  }

  res.status(200).json({ success: true, data: course })
})

/**
 * @async
 * @auth          Private
 * @route         POST /api/v1/bootcamps/:bootcampId/courses
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Create new courses
 * @memberof      CourseControllers

 
 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params

  req.body.bootcamp = bootcampId

  const bootcamp = await Bootcamp.findById(bootcampId).populate({
    path: 'bootcamp',
    select: 'name description'
  })

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Mo bootcamp with the id of ${bootcampId}`),
      404
    )
  }

  const course = await Course.create(req.body)

  res.status(201).json({ success: true, data: course })
})

/**
 * @async
 * @auth          Private
 * @route         PUT /api/v1/courses/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Update courses
 * @memberof      CourseControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id

  let course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true
  })

  if (!course) {
    return next(
      new ErrorResponse(`No Course was found with id of ${courseId}`, 404)
    )
  }

  course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: course })
})

/**
 * @async
 * @auth          Private
 * @route         DELETE /api/v1/courses/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Delete course
 * @memberof      BootcampControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id

  const course = await Course.findById(courseId)

  if (!course) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${courseId}`, 404)
    )
  }

  await course.remove()

  res.status(200).json({ success: true, data: {} })
})
