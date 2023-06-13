const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mainR = require("./BuddyChatBackend/router/mainR");
const userR = require("./BuddyChatBackend/router/userR");
const sequelize = require("./BuddyChatBackend/util/db");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "BuddyChatFrontEnd", "public")));
app.use(cors());
app.use(bodyParser.json());
app.use("/", mainR);
app.use("/user", userR);

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => {});
app.listen(3001);
