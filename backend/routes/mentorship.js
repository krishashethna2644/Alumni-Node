const express = require('express');
const Mentorship = require('../models/Mentorship');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/mentors', async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: 'alumni', 
      currentJob: { $exists: true, $ne: '' } 
    }).select('name currentJob company skills');
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/request', auth, async (req, res) => {
  try {
    const mentorship = new Mentorship({ ...req.body, mentee: req.user._id });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-requests', auth, async (req, res) => {
  try {
    const requests = await Mentorship.find({
      $or: [{ mentor: req.user._id }, { mentee: req.user._id }]
    }).populate('mentor mentee', 'name currentJob company');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const mentorship = await Mentorship.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(mentorship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;