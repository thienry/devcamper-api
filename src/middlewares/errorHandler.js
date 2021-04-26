import { ErrorResponse } from '../utils/ErrorResponse'

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let error = { ...err }
  error.message = err.message

  // Mongoose bad ObjectId
  if (err.kind === 'ObjectId') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Validation Error
  if (err.stack.includes('ValidationError')) {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandler
