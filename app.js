const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mainR = require("./BuddyChatBackend/router/mainR");
const userR = require("./BuddyChatBackend/router/userR");
const User = require("./BuddyChatBackend/model/userM");
const Message = require("./BuddyChatBackend/model/messageM");
const sequelize = require("./BuddyChatBackend/util/db");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(express.static(path.join(__dirname, "BuddyChatFrontEnd", "public")));
app.use(
  cors({
    origin: "http://127.0.0.1:3001",
  })
);

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

app.use(bodyParser.json());
app.use("/", mainR);
app.use("/user", userR);

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => {});
app.listen(3001);
