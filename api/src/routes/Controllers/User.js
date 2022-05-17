const { Activity, User ,DiaHora} = require("../../db");

// const getUserDni = async (dni) => {
//     const user = await User.findOne({
//         where: {
//             dni: dni
//         },
//         include: {
//             model: Activity,
//             attributes: ["name"],
//             through: {
//                 attributes: [],
//             },
//         }
//     })
//     return user;
// }

const getAllUsers = async () => {
  const user = await User.findAll({
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return user;
};

const getUserId = async (id) => {
  try {
    const UserUid = await User.findOne({
      where: {
        uid: id
      },
    });
    console.log(UserUid)
    if (UserUid) {
      return UserUid;
    } else {
      const UserId = await User.findOne({
        where: {
          id: id
        },
      });
      return UserId;
    }
  } catch (error) {
    return(error);
  }
};

const getUserId2 = async (id) => {
  try {
      const user2 = await User.findOne({
        where: {
          id: id
        }
      })
      if(user2){
        return user2
      }
  } catch (error) {
    return(error);
  }
};

const filterUserEmail = async (email) => {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    return error;
  }
};

const userCreate = async (uid, name, lastName, email, phoneNumber, image) => {
  try {
    const user = await User.findOrCreate({
      where: {
        uid: uid,
        name: name,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        image: image,  
      }
    });
    return user
  } catch (error) {
    return error;
  }
};

const userUpd = async (id, user) => {
  try {
    return await User.update(user, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    return(error);
  }
};

const userDelete = async (id) => {
  try {
    return await User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return(error);
  }
};

const userIsAdmin = async (id) => {
  const UserUid = await User.findOne({
    where: {
      uid: id
    },
  });
  if (UserUid) {
    return UserUid;
  } else {
    const UserId = await User.findOne({
      where: {
        id: id
      },
    });
    return UserId;
  }
};


//crear relacion entre usuario y un diaHora
const useraddDiaHora = async (idUser, idHoraDia) => {
  try {
      var usuario = await User.findByPk(idUser);
      var diaHora = await DiaHora.findByPk(idHoraDia);
      console.log(usuario)
      console.log(diaHora)
      if (usuario && diaHora) {
        await usuario.addDiaHora(diaHora)
          return true
      } else {
          return false
      }
  } catch (error) {
      return(error);
  }
}


module.exports = {
  getAllUsers,
  filterUserEmail,
  userCreate,
  userUpd,
  getUserId,
  userDelete,
  userIsAdmin,
  useraddDiaHora,
  getUserId2
};
