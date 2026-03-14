const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const router = express.Router();

// Extra strict rate limiting on auth routes — 20 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
});

// Helper: creates and signs a JWT for a given user ID
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Creates a new patient or provider account
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password needs uppercase, lowercase, and a number'),
    body('role')
      .isIn(['patient', 'provider'])
      .withMessage('Role must be patient or provider'),
    body('consentGiven')
      .equals('true')
      .withMessage('You must accept the data usage consent to register'),
  ],
  async (req, res, next) => {
    try {
      // Return all validation errors at once
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;

      // Check for duplicate email before attempting to insert
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
      }

      const user = await User.create({
        name,
        email,
        password,       // Auto-hashed by the pre-save hook in User model
        role,
        consentGiven: true,
        consentDate: new Date(),
      });

      const token = signToken(user._id);

      res.status(201).json({
        message: 'Account created successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      next(err); // Passed to global error handler
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Authenticates a user and returns a JWT
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Must explicitly select password since it has select:false in schema
      const user = await User.findOne({ email }).select('+password');

      // Use a single generic error message to prevent user enumeration attacks
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      if (!user.isActive) {
        return res.status(403).json({ error: 'Account has been deactivated. Contact support.' });
      }

      // Track last login time
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      const token = signToken(user._id);

      res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me
// Returns the current logged-in user's data (used for page refreshes)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/me', require('../middleware/auth').protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
