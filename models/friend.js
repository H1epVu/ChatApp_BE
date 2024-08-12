const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Friend = sequelize.define('friend', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'waiting',
        validate: {
            isIn: [['waiting', 'accept']]
        }
    }
}, {
    timestamps: true
});

module.exports = Friend;