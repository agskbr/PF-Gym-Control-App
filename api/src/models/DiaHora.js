const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    sequelize.define('diaHora', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },

    day:{
        type: DataTypes.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"),
    },

    hour:{
        type: DataTypes.STRING,
    },
    
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    });
};
