const Registration = require("../models/Registration");

// Admin panel only needs to view and prune registrations.
// Creating a registration happens on the public site (Module 3's backend-api).
module.exports = {
  getAll: async (req, res, next) => {
    try {
      const registrations = await Registration.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "eventId",
          select: "title date venue clubId",
          populate: { path: "clubId", select: "name" },
        });
      res.json(registrations);
    } catch (err) {
      next(err);
    }
  },

  getByEvent: async (req, res, next) => {
    try {
      const registrations = await Registration.find({
        eventId: req.params.eventId,
      }).sort({ createdAt: -1 });
      res.json(registrations);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const doc = await Registration.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Registration not found" });
      res.json({ message: "Registration deleted", id: req.params.id });
    } catch (err) {
      next(err);
    }
  },
};
