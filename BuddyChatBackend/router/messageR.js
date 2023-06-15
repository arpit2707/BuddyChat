const express = require("express");
const messageC = require("../controller/messageC");
const route = express.Router();

route.get("/getAllMessages", messageC.getMessage);

module.exports = route;
