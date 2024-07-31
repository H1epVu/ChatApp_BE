const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('chat_app', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;