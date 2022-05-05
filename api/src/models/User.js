const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    id:{
      type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    uid:{
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'No es una dirección de correo electrónico.'
        }
      },
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // ?lo dejo por las dudas!!
    // isUser: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // },
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
      defaultValue: 'https://www.ibm.com/blogs/systems/mx-es/wp-content/themes/ibmDigitalDesign/assets/img/anonymous.jpg'
    },
  // loginWithGoogle: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false
  // },
  });
};

