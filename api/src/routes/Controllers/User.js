const {
    Activity,
    User
} = require('../../db');



const getUserDni = async (dni) => {
    const user = await User.findOne({
        where: {
            dni: dni
        },
        include: {
            model: Activity,
            attributes: ["name"]
        }
    })
    return user;
}



const getAllUsers = async () => {
    const user = await User.findAll({
        include: {
            model: Activity,
            attributes: ["name"]
        }
    })
    return user;
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


const userCreate = async (name,lastName,email,age,phoneNumber,password,dni,image) => {
    try {
        return await User.create({
            name: name,
            lastName: lastName,
            dni: dni,
            email: email,
            age: age,
            phoneNumber: phoneNumber,
            password: password,
            image: image,
        })
    } catch (error) {
        return error
    }
}


module.exports = {
    getUserDni,
    getAllUsers,
    filterUserEmail,
    userCreate
}