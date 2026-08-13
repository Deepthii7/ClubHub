const Event = require("../models/Event");
const crudFactory = require("./crudFactory");

module.exports = crudFactory(Event, { populate: "clubId" });
