const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity_User', {
        payState: {
            type: DataTypes.ENUM("PAGO" , "NO-PAGO"),
            defaultValue:"NO-PAGO"
        },
        payDay: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });
}