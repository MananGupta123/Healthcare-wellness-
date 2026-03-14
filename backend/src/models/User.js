const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // ── Core Identity ────────────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // NEVER returned in queries unless explicitly requested
    },
    role: {
      type: String,
      enum: ['patient', 'provider'],
      default: 'patient',
    },

    // ── Patient Health Profile ───────────────────────────────────────────────
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    phone: { type: String, maxlength: 20 },
    address: { type: String, maxlength: 200 },
    allergies: { type: [String], default: [] },
    currentMedications: { type: [String], default: [] },
    bloodType: { type: String },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relationship: { type: String },
    },

    // ── Provider-Specific Fields ─────────────────────────────────────────────
    specialization: { type: String },
    licenseNumber: { type: String },

    // ── HIPAA Compliance Fields ──────────────────────────────────────────────
    consentGiven: {
      type: Boolean,
      required: [true, 'Data usage consent is required'],
      default: false,
    },
    consentDate: { type: Date },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// ── Password Hashing (runs before every save) ────────────────────────────────
// bcrypt with salt rounds=12 means 2^12 = 4096 iterations — very slow to crack
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password changed
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Password Comparison Method ───────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ── Remove Sensitive Fields from JSON Output ─────────────────────────────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// ── Indexes for Performance ──────────────────────────────────────────────────
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
