const {
    HoraDia,
    Activity,
    User
} = require('../../db');


// traigo los dias y horas con sus acividades
const allHoraDia = async () => {
        const allHoraDia = await HoraDia.findAll({
            include: {
                model: Activity,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        })
        return allHoraDia;
}

// traigo los dias y horas con sus usuarios
const allHoraDiaUser = async () => {
    const allHoraDiaUser = await HoraDia.findAll({
        include: {
            model: User,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
    return allHoraDiaUser;
}


// para crear un nuevo evento

const horaDiaCreate = async (days, hour,capacity,availability, activities) => {
    try {
        const horaDia = await HoraDia.findOne({
            where: {
                days: days,
                hour: hour,
            },
        })
        if (!horaDia) {
            const newHoraDia = await HoraDia.create({
                days,
                hour,
                capacity,
                availability,
                activities
            })
            return newHoraDia
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

// para buscar un evento con sus actividades
const horaDiaId = async (id) => {
    try {
        return await HoraDia.findOne({
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

// para buscar un evento con sus usuarios
const horaDiaIdUser = async (id) => {
    try {
        return await HoraDia.findOne({
            where: {
                id: id,
            },
            include: {
                model: User,
                attributes: ["name"]
            }
        })
    } catch (error) {
        console.log(error)
    }




// para eliminar el evento
const horaDiaDelete = async (days, hour) => {
    try {
        const horaDia = await HoraDia.findOne({
            where: {
                days: days,
                hour: hour,
            },
        })
        if (horaDia) {
            const deleteHoraDia = await HoraDia.destroy({
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
        return await HoraDia.destroy({
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
        return await HoraDia.update(horaDia,{
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
        let horaDia = await HoraDia.findOne({
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
        let horadia = await horaDia.findOne({
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
    horaDiaIdUser,
    horaDiaDelete,
    horaDiaDelete2,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
}
