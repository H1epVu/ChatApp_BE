const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Participant = sequelize.define('participant', {
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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Participant;