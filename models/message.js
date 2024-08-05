const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'conversations',
      key: 'id'
    }
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Message;