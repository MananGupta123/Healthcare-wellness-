const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    // Links this goal entry to a specific patient
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // What type of metric is being tracked
    type: {
      type: String,
      enum: ['steps', 'water', 'sleep', 'calories', 'active_time'],
      required: true,
    },
    // The actual value logged by the patient (e.g. 3620 steps)
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    // The patient's daily target (e.g. 8000 steps) — used to calculate % progress
    target: {
      type: Number,
      default: null,
    },
    // Unit label shown in UI (e.g. "steps", "ml", "hours", "min")
    unit: {
      type: String,
      default: '',
    },
    // The date this entry is for — stored at midnight for easy daily grouping
    date: {
      type: Date,
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      },
    },
    notes: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

// ── Compound Indexes for Fast Queries ────────────────────────────────────────
// "Get all goals for user X on date Y" happens on every dashboard load
goalSchema.index({ userId: 1, date: -1 });
goalSchema.index({ userId: 1, type: 1, date: -1 });

module.exports = mongoose.model('Goal', goalSchema);
