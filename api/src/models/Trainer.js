const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('trainer', {

    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
},
    
  });
};