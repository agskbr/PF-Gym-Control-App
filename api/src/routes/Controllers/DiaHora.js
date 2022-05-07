const {
    DiaHora,
    Activity,
    User
} = require('../../db');


// traigo los dias y horas con sus acividades
const allDiaHora = async () => {
    try {
        const allDia = await DiaHora.findAll({
            // include: [{model: Activity}], 
            include: {
                model: Activity,
                attributes: ["name", "image"]
            }
        })
        return allDia;
    } catch (error) {
        console.log(error);
    }
}
        

// traigo los dias y horas con sus usuarios
// const allHoraDiaUser = async (userId) => {

//     try {
//         let allHoraDiaUser = await HoraDia.findAll({
//             where: {
//                 userId: userId,
//             },
//         })
//         return allHoraDiaUser 
//     } catch (error) {
//         return error
//     }
// }


// para crear un nuevo evento

const createDiaHora = async (day, hour,capacity, activityId) => {
    try {
        const dia = await DiaHora.findOne({
            where: {
                activityId: activityId
            },
        })
        if (dia) {
            const newHoraDia = await DiaHora.create({
                day,
                hour,
                capacity,
                activityId
            })
            return newHoraDia;
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
}
}

// para buscar un evento con sus actividades
const diaHoraId = async (id) => {
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
const horaDiaDelete = async (day, hour) => {
    try {
        const horaDia = await HoraDia.findOne({
            where: {
                day: day,
                hour: hour,
            },
        })
        if (horaDia) {
            const deleteHoraDia = await HoraDia.destroy({
                where: {
                    day: day,
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
    allDiaHora,
    // allHoraDiaUser,
    createDiaHora,
    diaHoraId,
    horaDiaDelete,
    horaDiaDelete2,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
}
