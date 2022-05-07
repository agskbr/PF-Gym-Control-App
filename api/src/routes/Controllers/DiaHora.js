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
// const horaDiaDelete = async (day, hour) => {
//     try {
//         const horaDia = await HoraDia.findOne({
//             where: {
//                 day: day,
//                 hour: hour,
//             },
//         })
//         if (horaDia) {
//             const deleteHoraDia = await HoraDia.destroy({
//                 where: {
//                     day: day,
//                     hour: hour,
//                 }
//             })
//             return deleteHoraDia
//         }else{
//             return false
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// para eliminar un evento 2 opcion
const deleteDiaHora = async (id) => {
    try {
        await DiaHora.destroy({
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
    const { idUser, idDiaHora} = req.body;
    try {
        let diaHora = await DiaHora.findOne({
            where: {
                id: idDiaHora,
            },
        })
        let addUser = await User.findOne({
            where: {
                id: idUser,
            },
        })
        await diaHora.addUser(addUser);
        diaHora.save();
        console.log(diaHora.users.length)
        let newAvailability = diaHora.capacity - (diaHora.users.length + 1);
        console.log(newAvailability);
        diaHora.availability = newAvailability;
        diaHora.save();
        return res.json(diaHora);
    } catch (error) {
        console.log(error)
    }
}

// quitar un turno al usuario. esto seria para que se muestre habilitado o no la clase
const removeUserHoraDia = async (req, res) => {
    const { userId, diaHoraId } = req.params
    try {
        let turno = await tablaintermedia.findOne({
            where: {
                diaHoraId: parseInt(diaHoraId),
                userId: userId
            },
        })
        let diaHora = await horaDia.findOne({
            where: {
                id: diaHoraId
            },
            include: {
                model: User,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        })
        diaHora.availability = diaHora.availability + 1
        turno.destroy()
        diaHora.save()
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
    deleteDiaHora,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
}
