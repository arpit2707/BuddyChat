const express = require("express");
const messageC = require("../controller/messageC");
const route = express.Router();
const auth = require("../middleware/auth");

route.get("/getAllMessages", messageC.getMessage);
route.post("/message", auth.authenticate, messageC.sendMessage);

module.exports = route;
