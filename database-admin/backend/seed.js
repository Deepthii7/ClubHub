// Populates the database with a handful of sample records so the Admin
// Panel and the public frontends have something to show during development.
//
// Usage: npm run seed

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Club = require("./models/Club");
const Event = require("./models/Event");
const Announcement = require("./models/Announcement");
const Registration = require("./models/Registration");

async function seed() {
  await connectDB();

  console.log("🧹 Clearing existing data...");
  await Promise.all([
    Club.deleteMany({}),
    Event.deleteMany({}),
    Announcement.deleteMany({}),
    Registration.deleteMany({}),
  ]);

  console.log("🌱 Seeding clubs...");
  const clubs = await Club.insertMany([
    {
      name: "Codeverse",
      description: "The campus coding & competitive programming club.",
      category: "Technical",
      contactEmail: "codeverse@college.edu",
    },
    {
      name: "Rhythms",
      description: "Dance and music club for cultural events.",
      category: "Cultural",
      contactEmail: "rhythms@college.edu",
    },
    {
      name: "Smash Club",
      description: "Badminton and table tennis enthusiasts.",
      category: "Sports",
      contactEmail: "smash@college.edu",
    },
  ]);

  const [codeverse, rhythms, smash] = clubs;

  console.log("🌱 Seeding events...");
  const events = await Event.insertMany([
    {
      title: "HackNight 2026",
      description: "Overnight hackathon with prizes for top 3 teams.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      venue: "Main Auditorium",
      clubId: codeverse._id,
      capacity: 100,
    },
    {
      title: "Cultural Fiesta",
      description: "Annual dance and music showcase.",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      venue: "Open Air Theatre",
      clubId: rhythms._id,
      capacity: 300,
    },
    {
      title: "Badminton Open",
      description: "Inter-department badminton tournament.",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      venue: "Sports Complex",
      clubId: smash._id,
      capacity: 64,
    },
  ]);

  const [hackNight] = events;

  console.log("🌱 Seeding announcements...");
  await Announcement.insertMany([
    {
      title: "Registrations open for HackNight 2026!",
      content: "Team registrations are now open. Max team size: 4.",
      clubId: codeverse._id,
      pinned: true,
    },
    {
      title: "Rhythms auditions next week",
      content: "Open auditions for the Cultural Fiesta lineup.",
      clubId: rhythms._id,
    },
  ]);

  console.log("🌱 Seeding a sample registration...");
  await Registration.create({
    eventId: hackNight._id,
    name: "Aditi Rao",
    email: "aditi.rao@college.edu",
    phone: "9876543210",
    rollNo: "21CS045",
  });

  console.log("✅ Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
