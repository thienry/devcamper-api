/** @namespace BootcampControllers */

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
  const reqQuery = { ...req.query }

  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach((param) => delete reqQuery[param])

  const queryStr = JSON.stringify(reqQuery)
  const queryFormatted = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )

  let query = Bootcamp.find(JSON.parse(queryFormatted)).populate('courses')

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()

  query = query.skip(startIndex).limit(limit)

  const bootcamps = await query

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps
  })
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
  const bootcamp = await Bootcamp.findById(req.params.id)

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
