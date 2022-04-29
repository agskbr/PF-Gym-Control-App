const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {

    id:{
      type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },

    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    description:{
      type: DataTypes.TEXT,
      allowNull: true
    },

    video:{
      type: DataTypes.STRING,
      allowNull: true,
},
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },

    price:{
      type: DataTypes.INTEGER,
      allowNull: true
    },

    day:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },

    hour:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },

    capacity:{
      type: DataTypes.INTEGER,
      allowNull: true
    },

  });
};
