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
      allowNull: true,
      defaultValue: "https://media.istockphoto.com/photos/view-of-a-row-of-treadmills-in-a-gym-with-people-picture-id1183038884?b=1&k=20&m=1183038884&s=612x612&w=0&h=i_ai-BOp_ts9K9dMWgeBTqvPgZxIZtop7ZpU58grSOA="

    },

    price:{
      type: DataTypes.INTEGER,
      allowNull: true
    },

  });
};
