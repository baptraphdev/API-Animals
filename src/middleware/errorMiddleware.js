/**
 * Global error handling middleware
 */
module.exports = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default error response
  const error = {
    status: 'error',
    message: err.message || 'Internal Server Error'
  };
  
  // Add stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    error.stack = err.stack;
  }
  
  // Set appropriate status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json(error);
};