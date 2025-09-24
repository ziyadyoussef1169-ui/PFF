const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    team: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 10 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

registrationSchema.index({ email: 1, team: 1 }, { unique: false });

module.exports = mongoose.model('Registration', registrationSchema);
