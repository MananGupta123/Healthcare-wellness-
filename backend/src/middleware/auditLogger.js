const AuditLog = require('../models/AuditLog');

/**
 * auditLogger - HIPAA compliance middleware.
 * Automatically logs every sensitive write operation (POST, PUT, DELETE)
 * to the auditlogs collection AFTER the response is sent.
 *
 * Non-blocking: uses res.on('finish') so it never slows down the API response.
 * Fail-safe: errors in logging are caught and never crash the application.
 */
const auditLogger = (req, res, next) => {
  const sensitivePaths = ['/api/auth', '/api/patients', '/api/provider'];
  const isWrite = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
  const isSensitive = sensitivePaths.some((path) => req.path.startsWith(path));

  if (isWrite && isSensitive) {
    // Log AFTER response is sent — zero impact on response time
    res.on('finish', async () => {
      try {
        await AuditLog.create({
          userId: req.user ? req.user._id : null,
          action: `${req.method} ${req.path}`,
          resource: req.path,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          statusCode: res.statusCode,
        });
      } catch (err) {
        // Logging failure must NEVER crash the app
        console.error('[AuditLog Error]', err.message);
      }
    });
  }

  next();
};

module.exports = { auditLogger };
