const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        /* payState: {
            type: DataTypes.ENUM("PAGO" , "NO-PAGO"),
            defaultValue:"NO-PAGO"
        },
        payDay: {
            type: DataTypes.DATE,
            allowNull: true,
        }, */
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating:{
            type: DataTypes.ENUM,
            defaultValue: "5",
            values: ["1","2","3","4","5"]
        }
    });
}