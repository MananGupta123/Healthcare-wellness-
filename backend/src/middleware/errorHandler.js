/**
 * errorHandler - Global centralized error handler.
 * Must be the LAST middleware registered in server.js.
 * Catches all errors thrown via next(err) anywhere in the app
 * and converts them to consistent JSON responses.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  // Mongoose field validation failure (e.g. required field missing)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: messages.join(', ') });
  }

  // Duplicate unique field (e.g. email already registered)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: `${field} is already in use.` });
  }

  // Invalid MongoDB ObjectId format
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid resource ID format.' });
  }

  // Default: Internal Server Error
  // Never expose stack traces to clients in production
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong. Please try again.'
      : err.message,
  });
};

module.exports = { errorHandler };
