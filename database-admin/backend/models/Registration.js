const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    rollNo: { type: String, trim: true },
  },
  { timestamps: true }
);

// Prevent the same email from registering twice for the same event
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
