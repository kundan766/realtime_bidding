const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bid = sequelize.define('Bid', {
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Items',
            key: 'id',
        },
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
    bidAmount: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Bid;
