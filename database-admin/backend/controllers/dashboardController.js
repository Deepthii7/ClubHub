const Club = require("../models/Club");
const Event = require("../models/Event");
const Announcement = require("../models/Announcement");
const Registration = require("../models/Registration");

module.exports = {
  getSummary: async (req, res, next) => {
    try {
      const now = new Date();

      const [clubCount, eventCount, announcementCount, registrationCount, upcomingEvents, recentRegistrations] =
        await Promise.all([
          Club.countDocuments(),
          Event.countDocuments(),
          Announcement.countDocuments(),
          Registration.countDocuments(),
          Event.find({ date: { $gte: now } })
            .sort({ date: 1 })
            .limit(5)
            .populate("clubId", "name"),
          Registration.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate({ path: "eventId", select: "title" }),
        ]);

      res.json({
        counts: {
          clubs: clubCount,
          events: eventCount,
          announcements: announcementCount,
          registrations: registrationCount,
        },
        upcomingEvents,
        recentRegistrations,
      });
    } catch (err) {
      next(err);
    }
  },
};
