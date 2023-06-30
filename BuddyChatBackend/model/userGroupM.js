const sequelize = require("sequelize");
const db = require("../util/db");

const userGroup = db.define("userGroup", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  // // groupMsg: {
  // //   type: sequelize.STRING,
  // // },

  //New Content
  isAdmin: {
    type: sequelize.BOOLEAN,
    allowNull: true,
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  groupId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = userGroup;
