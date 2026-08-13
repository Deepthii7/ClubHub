const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

router.get("/", announcementController.getAll);
router.get("/:id", announcementController.getOne);
router.post("/", announcementController.create);
router.put("/:id", announcementController.update);
router.delete("/:id", announcementController.remove);

module.exports = router;
