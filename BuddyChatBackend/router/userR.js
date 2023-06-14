const express = require("express");
const route = express.Router();
const userC = require("../controller/userC");

route.post("/register", userC.register);
route.post("/login", userC.login);
route.get("/verified-user", userC.chatPage);
module.exports = route;
