const express = require("express");
const route = express.Router();
const groupC = require("../controller/groupC");
const auth = require("../middleware/auth");

route.post("/newGroup", auth.authenticate, groupC.newGroup);
route.get("/getGroups", auth.authenticate, groupC.getGroups);

module.exports = route;
