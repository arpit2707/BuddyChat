const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mainR = require("./BuddyChatBackend/router/mainR");
const userR = require("./BuddyChatBackend/router/userR");
const messageR = require("./BuddyChatBackend/router/messageR");
const groupR = require("./BuddyChatBackend/router/groupR");
const User = require("./BuddyChatBackend/model/userM");
const Message = require("./BuddyChatBackend/model/messageM");
const Groups = require("./BuddyChatBackend/model/groupM");
const UserGroup = require("./BuddyChatBackend/model/userGroupM");
const sequelize = require("./BuddyChatBackend/util/db");
const bodyParser = require("body-parser");
const userGroupR = require("./BuddyChatBackend/router/userGroupR");

app.use(express.static(path.join(__dirname, "BuddyChatFrontEnd", "public")));
app.use(
  cors({
    origin: "http://127.0.0.1:3001",
  })
);

User.hasMany(Message, { foreignKey: "phone" });
Message.belongsTo(User, { foreignKey: "phone" });
Groups.hasMany(Message, { foreignKey: "groupId" });
Message.belongsTo(Groups, { foreignKey: "groupId" });
User.belongsToMany(Groups, { through: UserGroup, foreignKey: "userId" });
Groups.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });
User.hasMany(UserGroup, { foreignKey: "userId" });
UserGroup.belongsTo(User, { foreignKey: "userId" });
Groups.hasMany(UserGroup, { foreignKey: "groupId" });
UserGroup.belongsTo(Groups, { foreignKey: "groupId" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainR);
app.use("/user", userR);
app.use("/message", messageR);
app.use("/group", groupR);
app.use("/userGroup", userGroupR);

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => {});
app.listen(3001);
