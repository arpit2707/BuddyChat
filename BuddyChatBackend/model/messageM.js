const Sequelize = require("sequelize");
const db = require("../util/db");

const message = db.define("message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  msg: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.BIGINT,
  },
});

module.exports = message;
