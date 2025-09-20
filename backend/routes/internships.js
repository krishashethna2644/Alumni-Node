const express = require('express');
const Internship = require('../models/Internship');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const internship = new Internship({ ...req.body, postedBy: req.user._id });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find({ isActive: true }).populate('postedBy', 'name company');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/apply', auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship.applicants.includes(req.user._id)) {
      internship.applicants.push(req.user._id);
      await internship.save();
    }
    res.json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;