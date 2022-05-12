const { Activity, User } = require("../../db");

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
    return await User.findOne({
      where: {
        id: id,
      },
      include: {
        model: Activity,
        attributes: ["name"],
      },
    });
  } catch (error) {
    console.log(error);
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
    return await User.create({
      uid: uid,
      name: name,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      image: image,
    });
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
    console.log(error);
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
    console.log(error);
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

module.exports = {
  getAllUsers,
  filterUserEmail,
  userCreate,
  userUpd,
  getUserId,
  userDelete,
  userIsAdmin,
};
