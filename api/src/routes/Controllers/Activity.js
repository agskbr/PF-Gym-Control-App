const {
    Activity,
    User,
    Trainer,
    DiaHora
} = require('../../db');



const activityIdHora = async (id) => {
    try {
        return await Activity.findOne({
            where: {
                id: id,
            },
            include: {
                model: DiaHora
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//obtener activida por nonmbre (devuelve unicamente la actividad)
const activityName = async (name) => {
    try {
        return await Activity.findOne({
            where: {
                name: name,
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//obtener activida por activityId
const activityId = async (id) => {
    try {
        return await Activity.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Trainer,
                    attributes: ["name"]
                },
                { model: DiaHora }
            ]
        })
    } catch (err) {
        console.log(err);
    }
}

//todas las actividades+Trainer+DiaHora
const allActivity = async () => {
    try {
        return await Activity.findAll({
            include: [
                {
                    model: Trainer,
                    attributes: ["name"],
                },
                {
                    model: DiaHora
                }
            ]
            
        })
    } catch (err) {
        console.log(err);
    }
}

//crear actividad - el dia y hora debe de ser uno creado nuevo en el cual no tenga relacion con ninguno
const createActivity = async (name, description, video, image, price, trainers, arrayIddh) => {
    try {
        let actividad = await Activity.findOne({
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
                price
            })
            const trainerenc = await Trainer.findAll({
                where: {
                    name: trainers,
                }
            })
            if (trainerenc[0]) {
                newAct.addTrainer(trainerenc);
            }
            actividad = newAct;
            const diahora = await DiaHora.findAll({
                where: {
                    id: arrayIddh,
                }
            })
            if (diahora[0]) {
                actividad.addDiaHora(diahora);
            }
            return actividad
        }
        return false
    } catch (error) {
        return (error)
    }
}


//actualizar Actividad sola
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

//eliminar actividad
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
    activityAddTrainer,
    activityName
}


