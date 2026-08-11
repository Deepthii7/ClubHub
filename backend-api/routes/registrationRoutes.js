const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Submit registration for an event
router.post('/:eventId/register', async (req, res) => {
  try {
    const registration = new Registration({
      ...req.body,
      eventId: req.params.eventId
    });
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: view all registrations for an event
router.get('/:eventId/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;