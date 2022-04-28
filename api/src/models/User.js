const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    // ? dejo estoy dos por las dudas que los itilicemos mas adelante. 
    // isadmin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    isUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status:{
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue:"ACTIVO"
    },
    notifications:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

