const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  field: { type: String, required: true },
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
  message: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Mentorship', mentorshipSchema);