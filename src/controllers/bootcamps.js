/** @namespace BootcampControllers */

import Bootcamp from '../models/Bootcamp'
import asyncHandler from '../middlewares/async'
import { ErrorResponse } from '../utils/ErrorResponse'

/**
 * @async
 * @auth          Public
 * @route         GET /api/v1/bootcamps
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get all bootcamps
 * @memberof      BootcampControllers
 
 * @returns   {Promise<void>}
 * @param     {Object} req - The data provided to each handler.
 * @param     {Object} res - The data provided to each handler.
 * @param     {function(Object)} next - The handler to call.
 */
export const getBootcamps = asyncHandler(async (req, res) => {
  const bootcamps = await Bootcamp.find()
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

/**
 * @async
 * @auth          Public
 * @route         GET /api/v1/bootcamps/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get single bootcamp
 * @memberof      BootcampControllers
 
 * @returns   {Promise<void>}
 * @param     {Object} req - The data provided to each handler.
 * @param     {Object} res - The data provided to each handler.
 * @param     {function(Object)} next - The handler to call.
 */
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.id
  const bootcamp = await Bootcamp.findById(bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${bootcampId}`, 404)
    )
  }

  res.status(200).json({ success: true, data: bootcamp })
})

/**
 * @async
 * @auth          Private
 * @route         POST /api/v1/bootcamps
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Create new bootcamp
 * @memberof      BootcampControllers

 
 * @returns   {Promise<void>}
 * @param     {Object} req - The data provided to each handler.
 * @param     {Object} res - The data provided to each handler.
 * @param     {function(Object)} next - The handler to call.
 */
export const createBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

/**
 * @async
 * @auth          Private
 * @route         PUT /api/v1/bootcamps/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Update bootcamp
 * @memberof      BootcampControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The data provided to each handler.
 * @param     {Object} res - The data provided to each handler.
 * @param     {function(Object)} next - The handler to call.
 */
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.id
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${bootcampId}`, 404)
    )
  }

  res.status(200).json({ success: true, data: bootcamp })
})

/**
 * @async
 * @auth          Private
 * @route         DELETE /api/v1/bootcamps/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Delete bootcamp
 * @memberof      BootcampControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The data provided to each handler.
 * @param     {Object} res - The data provided to each handler.
 * @param     {function(Object)} next - The handler to call.
 */
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.id
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${bootcampId}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
