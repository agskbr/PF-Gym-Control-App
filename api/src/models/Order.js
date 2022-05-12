const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0,
    },

    state: {
        type: DataTypes.ENUM('Cart','Created', 'Canceled', 'Complete'),
        defaultValue: 'Cart',
        allowNull: false
    },

});
};