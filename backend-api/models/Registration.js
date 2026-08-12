const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  rollNo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);