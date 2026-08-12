const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  bannerUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);