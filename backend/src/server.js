const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const providerRoutes = require('./routes/providers');
const publicRoutes = require('./routes/public');
const { auditLogger } = require('./middleware/auditLogger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// ── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet()); // Adds 14 HTTP security headers automatically
app.use(cors({
  origin: function (origin, callback) {
    const allowed = process.env.CLIENT_URL || 'http://localhost:5173';
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow exact match or Vercel preview deployments
    if (origin === allowed || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ── Rate Limiting (Brute Force Protection) ──────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

// ── Logging & Parsing ───────────────────────────────────────────────────────
app.use(morgan('combined')); // Logs: method, url, status, response time
app.use(express.json({ limit: '10kb' })); // Prevents large payload attacks

// ── HIPAA Audit Logging ─────────────────────────────────────────────────────
app.use(auditLogger);

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/public', publicRoutes);

// ── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ── Database Connection + Server Start ──────────────────────────────────────
// Skip DB connection in test environment — Jest imports `app` directly via supertest.
// MONGO_URI is injected as a GitHub Actions secret in CI so real tests pass there.
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}

module.exports = app;
