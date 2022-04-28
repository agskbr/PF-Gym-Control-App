const {
    Activity,
    User
} = require('../../db');

const getDetailsUser = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        },
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
    return user;
}

const getAllUsers = async () => {
    const user = await User.findOne({
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
    return user;
}

module.exports = {
    getDetailsUser,
    getAllUsers
}