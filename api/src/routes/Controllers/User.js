const {
    Activity,
    User
} = require('../../db');

const getDetailsUser = async (dni) => {
    const user = await User.findOne({
        where: {
            dni: dni
        },
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

module.exports = {
    getDetailsUser,
    getAllUsers
}