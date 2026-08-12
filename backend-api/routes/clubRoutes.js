const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// GET all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single club
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create club
router.post('/', async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update club
router.put('/:id', async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE club
router.delete('/:id', async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;