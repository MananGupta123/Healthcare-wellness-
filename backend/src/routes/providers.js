const express = require('express');
const mongoose = require('mongoose');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');

const router = express.Router();

// All provider routes require a valid JWT + role must be 'provider'
router.use(protect);
router.use(authorize('provider'));

// ─────────────────────────────────────────────────────────────────────────────
// Helper: compute the compliance badge for a single patient based on reminders
// ─────────────────────────────────────────────────────────────────────────────
function getComplianceBadge(reminders) {
  if (reminders.length === 0) {
    return { badge: 'Upcoming', color: 'blue' };
  }

  const statuses = reminders.map((r) => r.computedStatus());

  // Any missed reminder → red badge
  if (statuses.includes('missed')) {
    return { badge: 'Missed Preventive Checkup', color: 'red' };
  }

  // All reminders are met → green badge
  if (statuses.every((s) => s === 'met')) {
    return { badge: 'Goal Met', color: 'green' };
  }

  // Default: at least one upcoming, none missed
  return { badge: 'Upcoming', color: 'blue' };
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/provider/patients
// Returns all active patients with a compliance badge for each
// ─────────────────────────────────────────────────────────────────────────────
router.get('/patients', async (req, res, next) => {
  try {
    // Fetch all active patients — exclude password from response
    const patients = await User.find({ role: 'patient', isActive: true }).select('-password');

    // Build enriched list: for each patient, compute their compliance badge
    const enriched = await Promise.all(
      patients.map(async (patient) => {
        const reminders = await Reminder.find({ userId: patient._id });
        const complianceBadge = getComplianceBadge(reminders);
        return {
          ...patient.toObject(),
          complianceBadge,
        };
      })
    );

    res.json({ patients: enriched });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/provider/patients/:id
// Full profile for one patient: profile + goals + reminders (with computedStatus)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/patients/:id', async (req, res, next) => {
  try {
    // Validate that the id is a proper MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid patient ID.' });
    }

    const patient = await User.findOne({ _id: req.params.id, role: 'patient' }).select('-password');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    // Fetch goals sorted by most recent first
    const goals = await Goal.find({ userId: patient._id }).sort({ date: -1 });

    // Fetch reminders sorted soonest first, enriched with computedStatus
    const remindersRaw = await Reminder.find({ userId: patient._id }).sort({ dueDate: 1 });
    const reminders = remindersRaw.map((r) => ({
      ...r.toObject(),
      computedStatus: r.computedStatus(),
    }));

    const complianceBadge = getComplianceBadge(remindersRaw);

    res.json({
      patient,
      goals,
      reminders,
      complianceBadge,
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/provider/patients/:id/compliance
// Compliance summary only — used by the provider dashboard badge display
// ─────────────────────────────────────────────────────────────────────────────
router.get('/patients/:id/compliance', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid patient ID.' });
    }

    const patient = await User.findOne({ _id: req.params.id, role: 'patient' }).select('name email');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    const reminders = await Reminder.find({ userId: patient._id });
    const complianceBadge = getComplianceBadge(reminders);

    // Also count totals for a quick summary
    const statuses = reminders.map((r) => r.computedStatus());
    const summary = {
      total: reminders.length,
      met: statuses.filter((s) => s === 'met').length,
      missed: statuses.filter((s) => s === 'missed').length,
      upcoming: statuses.filter((s) => s === 'upcoming').length,
    };

    res.json({
      patient: { _id: patient._id, name: patient.name, email: patient.email },
      complianceBadge,
      summary,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
