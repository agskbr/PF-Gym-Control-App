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
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    // ? dejo estoy dos por las dudas que los itilicemos mas adelante. 
    // isadmin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    // isprofessor: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    isuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    diaDePago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estadoDePago:{
      type: DataTypes.ENUM("PAGO" , "NO-PAGO"),
      defaultValue:"NO-PAGO"
    },
    status:{
      type: DataTypes.ENUM("ACTIVO" , "INACTIVO"),
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