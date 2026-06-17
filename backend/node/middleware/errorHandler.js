class AppError extends Error {
  constructor(message, statusCode = 500, errors) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || (error.name === 'MulterError' ? 400 : 500);
  const message = statusCode >= 500 ? 'Internal server error' : error.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(error.errors ? { errors: error.errors } : {}),
  });
}

module.exports = { AppError, asyncHandler, notFound, errorHandler };
