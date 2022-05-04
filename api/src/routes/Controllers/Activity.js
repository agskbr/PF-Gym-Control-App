const {
    Activity,
    User,
    Trainer
} = require('../../db');



const activityId = async (id) => {
    try {
        return await Activity.findOne({
            where: {
                id: id,
            },
            include: {
                model: Trainer,
                attributes: ["name"]
            }
        })
    } catch (err) {
        console.log(err);
    }
}


const allActivity = async () => {
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



const createActivity = async (name, description, video, image, price, day, hour, capacity, trainers) => {
    try {
        const actividad = await Activity.findOne({
            where: {
                name: name,
            },
        })
    
        if (!actividad) {
            const newAct = await Activity.create({
                name,
                description,
                video,
                image,
                price,
                day,
                hour,
                capacity,
                trainers
            })
            const trainerenc = await Trainer.findAll({
                where: {
                    name: trainers,
                }
            })
            if (trainerenc[0]) {
                newAct.addTrainer(trainerenc);
            }
            return newAct
        }else return actividad
    } catch (error) {
        console.log(error)
    }
}

const activityUpd = async (id,activity) => {
    try {
        return await Activity.update(activity,{   
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error)
    }
}


const deleteActivity = async (id) => {
    try {
        await Activity.destroy({   
            where: {                                            
                id : id,
            }
        })
    } catch (error) {
        return error
    }
}

//eliminar un trainer de una actividad
const activityDeleteTrainer = async (idActivity, idTrainer) => {
    try {
        var activity = await Activity.findByPk(idActivity);
        var trainer = await Trainer.findByPk(idTrainer);
        if (trainer && activity) {
            activity.removeTrainer(trainer);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}


//asignar un entrenador a una actividad 
const activityAddTrainer = async (idActivity, idTrainer) => {
    try {
        var activity = await Activity.findByPk(idActivity);
        var trainer = await Trainer.findByPk(idTrainer);
        if (trainer && activity) {
            activity.addTrainer(trainer);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    allActivity,
    activityId,
    createActivity,
    activityUpd,
    deleteActivity,
    activityDeleteTrainer,
    activityAddTrainer
}


