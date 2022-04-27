const {
    Activity,
    User
} = require('../../db');


const activitysDbInfo = async () => {
    try {
        return await Activity.findAll({
            include: {
                model: User,
                attributes: ["name","lastName","dni"],
                include: {
                    model: Activity_User,
                    attributes: ["payDay", "payState"]
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    activitysDbInfo
}