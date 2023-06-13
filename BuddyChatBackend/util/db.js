const Sequelize = require("sequelize");
require("dotenv").config();

const sequelizer = new Sequelize(
  `${process.env.DEFAULT_DATABASE}`,
  `${process.env.MYSQL_USER}`,
  `${process.env.MYSQL_PASSWORD}`,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelizer;
