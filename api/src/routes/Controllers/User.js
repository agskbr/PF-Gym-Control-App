const {
    Activity,
    User
} = require('../../db');

const getDetailsUser = async (id) => {
    const user = await User.findAll({
        where: {
            name: id
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


module.exports = {
    getDetailsUser
}