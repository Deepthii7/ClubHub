const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");

// GET /api/admin/registrations -> every registration, across all events
router.get("/", registrationController.getAll);
router.delete("/:id", registrationController.remove);

module.exports = router;
