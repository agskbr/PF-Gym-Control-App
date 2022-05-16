const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('descuento', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        codigo: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
}