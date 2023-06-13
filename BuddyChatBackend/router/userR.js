const express = require("express");
const route = express.Router();
const userC = require("../controller/userC");

route.post("/register", userC.register);

module.exports = route;
