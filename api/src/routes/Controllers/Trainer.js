const {
    Activity,
    Trainer
} = require('../../db');

const allTrainers = async () => {
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

const trainerId = async (id) => {
    try {
        return await Trainer.findOne({
            where: {
                id: id,
            },
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
    } catch (error) {
        return error
    }
}

const trainerDelete = async (id) => {
    try {
        await Trainer.destroy({   
            where: {                                            
                id : id,
            }
        })
    } catch (error) {
        return error
    }
}

const trainerCreated = async (name,image,specialty,experience,activity) => {
    try {
        const trainerCreated = await Trainer.create({ 
            name,
            image,
            specialty,
            experience,
        });
        activity.forEach( async element => {
            const ActDb = await Activity.findAll({
                where: {
                    name: element,
                }
            })
            trainerCreated.addActivity(ActDb)
        });
    } catch (error) {
        return error
    }
}


module.exports = {
    allTrainers,
    trainerId,
    trainerDelete,
    trainerCreated
}