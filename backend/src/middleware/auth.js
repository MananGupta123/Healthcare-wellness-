const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * protect - Verifies the JWT token from the Authorization header.
 * Attaches the decoded user to req.user for downstream route handlers.
 * Blocks the request with 401 if the token is missing, expired, or invalid.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // JWT is sent as: "Authorization: Bearer <token>"
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Please log in.' });
    }

    // Verify signature and expiry using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user from DB (catches deactivated accounts)
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Account not found or deactivated.' });
    }

    req.user = user; // Attach user to request for use in routes
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    next(err);
  }
};

/**
 * authorize - Role-based access control.
 * Call after protect(). Rejects if the user's role isn't in the allowed list.
 * Example: authorize('provider') will block patients with 403 Forbidden.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. This area is for ${roles.join(' or ')} accounts only.`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
