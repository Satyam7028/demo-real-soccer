// server/middleware/errorMiddleware.js

// 404 Not Found handler
export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || 'Server error',
  });
};
