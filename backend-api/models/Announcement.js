const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);