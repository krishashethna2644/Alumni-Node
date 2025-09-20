const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'alumni', 'admin'], default: 'student' },
  graduationYear: { type: Number },
  department: { type: String },
  currentJob: { type: String },
  company: { type: String },
  location: { type: String },
  phone: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  skills: [String],
  linkedIn: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);