const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const totalAlumni = await User.countDocuments({ role: 'alumni' });
    const totalEvents = await Event.countDocuments();
    const recentAlumni = await User.find({ role: 'alumni' }).sort({ createdAt: -1 }).limit(5).select('-password');
    
    res.json({ totalAlumni, totalEvents, recentAlumni });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/alumni', auth, adminAuth, async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/alumni/:id', auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alumni deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;