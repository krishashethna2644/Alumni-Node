const express = require('express');
const Message = require('../models/Message');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const message = new Message({ ...req.body, sender: req.user._id });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/inbox', auth, async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user._id })
      .populate('sender', 'name')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/sent', auth, async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user._id })
      .populate('recipient', 'name')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/read', auth, async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;