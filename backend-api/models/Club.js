const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  logoUrl: { type: String },
  contactEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);