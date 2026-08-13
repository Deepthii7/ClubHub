const Announcement = require("../models/Announcement");
const crudFactory = require("./crudFactory");

module.exports = crudFactory(Announcement, { populate: "clubId" });
