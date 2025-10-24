import logger from "../utils/logger.js"

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
} 

export const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  
  // Sometimes Express sets statusCode = 200 even on errors, fix it:
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // show stack trace only in development for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}