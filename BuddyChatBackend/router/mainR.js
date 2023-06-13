const express = require("express");
const route = express.Router();
const mainC = require("../controller/mainC");

route.get("/", mainC.getMain);

module.exports = route;
