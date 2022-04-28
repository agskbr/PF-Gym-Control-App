const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Dietipe', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

  });
};


// aca decido no poner el id, ya que no voy a tener problema que se me dupliquen. Me lo va a traer por defecto.