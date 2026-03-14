const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const { auditLogger } = require('./middleware/auditLogger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// ── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet()); // Adds 14 HTTP security headers automatically
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
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

// ── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ── Database Connection + Server Start ──────────────────────────────────────
const PORT = process.env.PORT || 5000;

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

module.exports = app;
