const {
    Activity,
    User,
    Trainer
} = require('../../db');

const activitysDbInfo = async () => {
    try {
        return await Activity.findAll({
            /* include: {
                model: User,
                attributes: ["name","lastName","dni"],
                through: {
                    attributes: [],
                },
            },
                attributes: ["name","lastName","dni"]
            }, */
            include: {
                model: Trainer,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
            
        })
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    activitysDbInfo,
}


