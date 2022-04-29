const {
    Activity,
    Trainer
} = require('../../db');

const trainersDbInfo = async () => {
    try {
        return await Trainer.findAll({
            include: {
                model: Activity,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    trainersDbInfo,
}