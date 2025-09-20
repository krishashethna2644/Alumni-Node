const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['reunion', 'networking', 'workshop', 'seminar'], required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: { type: Number },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);