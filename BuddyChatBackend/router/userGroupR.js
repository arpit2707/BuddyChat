const express = require("express");
const route = express.Router();
const userGroupC = require("../controller/userGroupC");
const auth = require("../middleware/auth");

// //route.post("/message", auth.authenticate, userGroupC.message);
route.post("/defaultAdmin", auth.authenticate, userGroupC.setGroup);
route.get("/isAdmin", auth.authenticate, userGroupC.checkAdmin);
route.post("/addUser", userGroupC.addUser);
route.get("/getNonAdmins", userGroupC.getNonAdmins);
route.post("/makeAdmin", userGroupC.makeAdmin);
route.post("/getUsers", userGroupC.getUsers);
route.post("/removeUser", userGroupC.removeUser);
// //Ye Link Eradicate kar gya

// // route.get("/getAllMessages", auth.authenticate, userGroupC.getMessages);

module.exports = route;
