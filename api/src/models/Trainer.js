const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('trainer', {

    id:{
      type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },

    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    specialty:{
      type: DataTypes.STRING,
      allowNull: true
    },

    experience:{
      type: DataTypes.TEXT,
      allowNull: true,
},
    
  });
};