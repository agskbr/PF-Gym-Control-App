const {
    DiaHora,
    Activity,
    User
} = require('../../db');


// traigo los dias y horas con sus acividades
const allHoraDia = async () => {
        const allHoraDia = await DiaHora.findAll({
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
        return allHoraDia;
}


// traigo todos los dias y horas de un usuario
const allHoraDiaUser = async (userId) => {
    const allHoraDiaUser = await DiaHora.findAll({
        where: {
            userId: userId
        },
    })
    return allHoraDiaUser;
}


// para crear un nuevo diaHora
const horaDiaCreate = async (day, hour, capacity) => {
    try {
        const newHoraDia = await DiaHora.create({
            day,
            hour,
            capacity
        })
        return newHoraDia
    } catch (error) {
        return(error)
    }
}

// para buscar un evento con sus actividades
const horaDiaId = async (id) => {
    try {
        return await DiaHora.findOne({
            where: {
                id: id,
            },
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
    } catch (error) {
        console.log(error)
    }
}



// para eliminar el evento
const horaDiaDelete = async (days, hour) => {
    try {
        const horaDia = await DiaHora.findOne({
            where: {
                days: days,
                hour: hour,
            },
        })
        if (horaDia) {
            const deleteHoraDia = await DiaHora.destroy({
                where: {
                    days: days,
                    hour: hour,
                }
            })
            return deleteHoraDia
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

// para eliminar un evento 2 opcion
const horaDiaDelete2 = async (id) => {
    try {
        return await DiaHora.destroy({
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log(error)
    }   
}

// para modificar un evento

const horaDiaUpd = async (id,horaDia) => {
    try {
        return await DiaHora.update(horaDia,{
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// actualizar turno de usuario. esto seria cada vez que el usuario quiera acceder a un turno
const updateHoraDia = async (req, res) => { 
    const { idUser, idHoraDia} = req.body;
    try {
        let horaDia = await DiaHora.findOne({
            where: {
                id: idHoraDia,
            },
        })
        let addUser = await User.findOne({
            where: {
                id: idUser,
            },
        })
        await horaDia.addUser(addUser);
        horaDia.save();
        console.log(horaDia.users.length)
        let newAvailability = horaDia.capacity - (horaDia.users.length + 1);
        console.log(newAvailability);
        horaDia.availability = newAvailability;
        horaDia.save();
        return res.json(horaDia);
    } catch (error) {
        console.log(error)
    }
}

// quitar un turno al usuario. esto seria para que se muestre habilitado o no la clase
const removeUserHoraDia = async (req, res) => {
    const { userId, horadiaId } = req.params
    try {
        let turno = await tablaintermedia.findOne({
            where: {
                horadiaId: parseInt(horadiaId),
                userId: userId
            },
        })
        let horadia = await DiaHora.findOne({
            where: {
                id: horadiaId
            },
            include: {
                model: User,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        })
        horadia.availability = horadia.availability + 1
        turno.destroy()
        horadia.save()
        return res.json({
            message: "turno eliminado"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    allHoraDia,
    allHoraDiaUser,
    horaDiaCreate,
    horaDiaId,
    //horaDiaIdUser,
    horaDiaDelete,
    horaDiaDelete2,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
}