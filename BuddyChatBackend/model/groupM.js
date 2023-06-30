const sequelize = require("sequelize");
const db = require("../util/db");

const group = db.define("group", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  createdBy: {
    type: sequelize.STRING,
    allowNull: false,
  },
  // adminId: {
  //   type: sequelize.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = group;
