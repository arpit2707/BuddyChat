const Sequelize = require("sequelize");
const db = require("../util/db");

const archive = db.define("archive", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  msg: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  //New content
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  fileURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = archive;
