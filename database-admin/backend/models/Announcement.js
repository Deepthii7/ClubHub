const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    date: {
      type: String,
      default: "",
    },

    time: {
      type: String,
      default: "",
    },

    venue: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);