const express = require("express");
const route = express.Router();
const userC = require("../controller/userC");
const auth = require("../middleware/auth");

route.post("/register", userC.register);
route.post("/login", userC.login);
route.get("/verified-user", userC.chatPage);
route.post("/message", auth.authenticate, userC.sendMessage);

module.exports = route;
