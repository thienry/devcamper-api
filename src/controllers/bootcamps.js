/** @namespace BootcampControllers */

import path from 'path'

import geocoder from '../utils/geocoder'
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
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const getBootcamps = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

/**
 * @async
 * @auth          Public
 * @route         GET /api/v1/bootcamps/:id
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get single bootcamp
 * @memberof      BootcampControllers
 
 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
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
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
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
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
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
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.id
  const bootcamp = await Bootcamp.findById(bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${bootcampId}`, 404)
    )
  }

  await bootcamp.remove()

  res.status(200).json({ success: true, data: {} })
})

/**
 * @async
 * @auth          Private
 * @route         GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Get bootcamps within a radius
 * @memberof      BootcampControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  const [loc] = await geocoder.geocode(zipcode)

  if (!loc) {
    return next(
      new ErrorResponse(`No address found with zipcode ${zipcode} passed`, 404)
    )
  }

  const lat = loc.latitude
  const lng = loc.longitude
  const radius = distance / 6378

  const query = {
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius]
      }
    }
  }

  const bootcamps = await Bootcamp.find(query)

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

/**
 * @async
 * @auth          Private
 * @route         PUT /api/v1/bootcamps/:id/photo
 * @author        Thiago Moura <thmoura14@gmail.com>
 * @description   Upload photo for bootcamp
 * @memberof      BootcampControllers

 * @returns   {Promise<void>}
 * @param     {Object} req - The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on
 * @param     {Object} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @param     {function(Object)} next - The handler to call.
 */
export const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.id
  const bootcamp = await Bootcamp.findById(bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${bootcampId}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400))
  }

  const file = req.files.file
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      console.error(error)
      new ErrorResponse('Something went wrong with file upload', 500)
    }

    await Bootcamp.findByIdAndUpdate(bootcampId, { photo: file.name })

    res.status(200).json({ success: true, data: file.name })
  })
})
