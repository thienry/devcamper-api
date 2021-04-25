/** @namespace BootcampControllers */

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
export function getBootcamps(req, res, next) {
  res.status(200).json({ message: 'OK' })
  next()
}

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
export function getBootcamp(req, res, next) {
  res.status(200).json({ message: 'OK' })
  next()
}

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
export function createBootcamp(req, res, next) {
  res.status(200).json({ message: 'OK' })
  next()
}

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
export function updateBootcamp(req, res, next) {
  res.status(200).json({ message: 'OK' })
  next()
}

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
export function deleteBootcamp(req, res, next) {
  res.status(200).json({ message: 'OK' })
  next()
}
