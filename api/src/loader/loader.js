const { Activity, User } = require('../db');
const activities = require('../../activity.json')
const users = require('../../usuarios.json')

const loaderUsers = async () => {
    try {
        const modelUsers = users.map((el) => {
            return {
                name: el.name,
                lastName: el.lastName,
                dni: el.dni,
                email: el.email,
                age: el.age,
                phoneNumber: el.phoneNumber,
                password: el.password,
                image: el.image,
            };
        });
        modelUsers.forEach(async (el) => {
            const userIns = await User.findOrCreate({
                where: {
                    name: el.name,
                    lastName: el.lastName,
                    dni: el.dni,
                    email: el.email,
                    age: el.age,
                    phoneNumber: el.phoneNumber,
                    password: el.password,
                    image: el.image,
                },
            });
            /* el.activity.forEach(async (e) => {
                const activityIns = await Activity.findOne({
                    where: {
                        name: e.name
                    }
                })
                await activityIns.addUser(userIns[0])
            }) */
        });
        console.log('Usuarios cargados en la DB')
    }
    catch (error) {
        console.log('Error en la carga de usuarios a la DB')
    }
}

const loaderActivity = async () => {
    try {
        const modelActivity = activities.map((el) => {
            return {
                name: el.name,
                description: el.description,
                video: el.video,
                image: el.image,
                price: el.price
            };
        });
        modelActivity.forEach(async (el) => {
            await Activity.findOrCreate({
                where: {
                    name: el.name,
                    description: el.description,
                    video: el.video,
                    image: el.image,
                    price: el.price
                },
            });
        });
        console.log('Actividades cargadas en la DB')
    }
    catch (error) {
        console.log('Error en la carga de actividades a la DB')
    }
}

module.exports = {
    loaderUsers,
    loaderActivity
}