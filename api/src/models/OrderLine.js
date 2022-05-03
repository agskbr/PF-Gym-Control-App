const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("orderline", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        unitprice:{
            type: DataTypes.DECIMAL(9, 2),
            allowNull: false,
        },

        subtotal: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: false,
        },

        //catidad de clases compradas de la clase elegida
        quantity: {
            type: DataTypes.INTEGER,
        },
    });
};