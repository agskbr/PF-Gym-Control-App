const {
    Activity,
    User
} = require('../../db');



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
        }
    })
    return user;
}

const userId = async (id) => {
    try {
        return await User.findOne({
            where: {
                id: id,
            },
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const filterUserEmail = async (email) => {
    try {
        return await User.findOne({
            where: {
                email: email,
            },
        })
    } catch (error) {
        return error;
    }
}


const userCreate = async (uid, name,lastName,email,phoneNumber,password,image) => {
    try {
        return await User.create({
            uid: uid,
            name: name,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            image: image,
        })
    } catch (error) {
        return error
    }
}


const userUpd = async (id,user) => {
    try {
        return await User.update(user,{   
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUsers,
    filterUserEmail,
    userCreate,
    userUpd,
    userId
}