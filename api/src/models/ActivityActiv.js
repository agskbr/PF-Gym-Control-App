const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("activityActiv", {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        //ver bien si es conveniente o hacerlo asi preciso o con enums y valores predefiindos
        //seria un array donde guarde todos los dias de las clases que le quedan
        //en caso que on le queden dias deberia de cambiarse su estado a inactiva
        days: {
            type: DataTypes.ARRAY(DataTypes.STRING)//["22/3/22","23/3/22","25/3/22"]
        },

        //en duda
        state: {
            type: DataTypes.ENUM('Active', 'Inactive',),
            defaultValue: 'Active',
            allowNull: false
        },

        //catidad de clases disponibles
        quantity: {
            type: DataTypes.INTEGER,
        },
    });
};