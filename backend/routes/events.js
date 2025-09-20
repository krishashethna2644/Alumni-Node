const express = require('express');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.attendees.includes(req.user._id)) {
      event.attendees.push(req.user._id);
      await event.save();
    }
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;