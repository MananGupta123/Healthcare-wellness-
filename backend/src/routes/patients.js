const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');

const router = express.Router();

// All routes below require: valid JWT + role must be 'patient'
router.use(protect);
router.use(authorize('patient'));

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/patients/me — Get own profile
// ─────────────────────────────────────────────────────────────────────────────
router.get('/me', (req, res) => {
  // req.user is already attached by protect() middleware
  res.json({ user: req.user });
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/patients/me — Update own profile
// Only whitelisted fields can be changed — role/email/password are NOT here
// ─────────────────────────────────────────────────────────────────────────────
router.put(
  '/me',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('allergies').optional().isArray().withMessage('Allergies must be an array'),
    body('currentMedications').optional().isArray(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Whitelist: only these fields can be updated through this endpoint
      const allowed = [
        'name', 'phone', 'dateOfBirth', 'gender', 'address',
        'allergies', 'currentMedications', 'bloodType', 'emergencyContact',
      ];

      const updates = {};
      allowed.forEach((field) => {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      });

      const user = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true, runValidators: true }
      );

      res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/patients/goals — Get wellness goals
// Optional query params: ?date=2025-04-15  ?type=steps  ?limit=30
// ─────────────────────────────────────────────────────────────────────────────
router.get('/goals', async (req, res, next) => {
  try {
    const { date, type, limit = 30 } = req.query;
    const filter = { userId: req.user._id };

    // Filter by a specific date if provided
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    if (type) filter.type = type;

    const goals = await Goal.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit));

    // Also fetch today's summary for the dashboard progress bars
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayGoals = await Goal.find({
      userId: req.user._id,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    res.json({ goals, todayGoals });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/patients/goals — Log a wellness goal entry
// Uses upsert: logging the same type twice in a day updates, not duplicates
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/goals',
  [
    body('type')
      .isIn(['steps', 'water', 'sleep', 'calories', 'active_time'])
      .withMessage('Invalid goal type'),
    body('value').isNumeric().isFloat({ min: 0 }).withMessage('Value must be a positive number'),
    body('target').optional().isNumeric(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { type, value, target, unit, notes, date } = req.body;

      // Normalize to midnight so same-day entries upsert correctly
      const entryDate = date ? new Date(date) : new Date();
      entryDate.setHours(0, 0, 0, 0);

      // findOneAndUpdate with upsert: insert if not exists, update if exists
      const goal = await Goal.findOneAndUpdate(
        { userId: req.user._id, type, date: entryDate },
        { value, target, unit, notes },
        { upsert: true, new: true, runValidators: true }
      );

      res.status(201).json({ message: 'Goal logged successfully', goal });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/patients/reminders — Get all reminders (sorted soonest first)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/reminders', async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id })
      .sort({ dueDate: 1 });

    // Enrich each reminder with computed status at read time
    const enriched = reminders.map((r) => ({
      ...r.toObject(),
      computedStatus: r.computedStatus(),
    }));

    res.json({ reminders: enriched });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/patients/reminders — Create a preventive care reminder
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/reminders',
  [
    body('title').trim().notEmpty().withMessage('Reminder title is required'),
    body('dueDate').isISO8601().withMessage('Valid due date required (ISO format)'),
    body('type')
      .optional()
      .isIn(['checkup', 'medication', 'vaccination', 'lab_test', 'custom']),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, type, dueDate } = req.body;

      const reminder = await Reminder.create({
        userId: req.user._id,
        title,
        description,
        type,
        dueDate,
        createdBy: req.user._id,
      });

      res.status(201).json({ message: 'Reminder created', reminder });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/patients/reminders/:id/status — Mark reminder as met or missed
// ─────────────────────────────────────────────────────────────────────────────
router.put('/reminders/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['met', 'missed', 'upcoming'].includes(status)) {
      return res.status(400).json({ error: 'Status must be: met, missed, or upcoming' });
    }

    // userId check ensures patients can only update their OWN reminders
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found.' });
    }

    res.json({ message: 'Status updated', reminder });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
