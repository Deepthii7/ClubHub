require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("ClubHub Module 4 — Database & Admin API is running!");
});

// Admin API routes
app.use("/api/admin/clubs", clubRoutes);
app.use("/api/admin/events", eventRoutes);
app.use("/api/admin/announcements", announcementRoutes);
app.use("/api/admin/registrations", registrationRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Admin API running on http://localhost:${PORT}`);
  });
});
