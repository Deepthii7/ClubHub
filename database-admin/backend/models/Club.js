const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Technical",
        "Cultural",
        "Sports",
        "Literary",
        "Arts",
        "Social",
        "Other",
      ],
    },
    logoUrl: { type: String, default: "" },
    contactEmail: { type: String, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
