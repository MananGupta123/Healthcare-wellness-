const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    // Which patient this reminder belongs to
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Reminder title is required'],
      maxlength: 200,
    },
    description: { type: String, maxlength: 500 },
    // Category of the reminder
    type: {
      type: String,
      enum: ['checkup', 'medication', 'vaccination', 'lab_test', 'custom'],
      default: 'checkup',
    },
    // When this care action is due
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    // Current state — drives the compliance badges on the provider dashboard
    status: {
      type: String,
      enum: ['upcoming', 'met', 'missed'],
      default: 'upcoming',
    },
    // Who created this reminder (could be patient themselves or a provider)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// ── Index for Provider Compliance Queries ─────────────────────────────────────
reminderSchema.index({ userId: 1, dueDate: 1 });

// ── Dynamic Status Computation ────────────────────────────────────────────────
// If the due date passed and it was never marked 'met', auto-show as 'missed'
// This runs at read time — no scheduled jobs needed
reminderSchema.methods.computedStatus = function () {
  if (this.status !== 'upcoming') return this.status;
  return new Date() > this.dueDate ? 'missed' : 'upcoming';
};

module.exports = mongoose.model('Reminder', reminderSchema);
