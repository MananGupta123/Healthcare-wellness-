const mongoose = require('mongoose');

// HIPAA requires tracking who accessed/modified protected health information
const auditLogSchema = new mongoose.Schema(
  {
    // null for unauthenticated requests (e.g. failed login attempts)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // What happened: e.g. "PUT /api/patients/me", "POST /api/auth/login"
    action: {
      type: String,
      required: true,
    },
    resource: { type: String },           // The API path accessed
    ip: { type: String },                 // Client IP address
    userAgent: { type: String },          // Browser/client info
    statusCode: { type: Number },         // HTTP response code (200, 401, etc.)
  },
  { timestamps: true } // createdAt gives us the exact timestamp of every action
);

// ── Indexes for Audit Queries ─────────────────────────────────────────────────
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
