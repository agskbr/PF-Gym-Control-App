const { Activity, User, Trainer } = require('../db');
const activities = require('../../activity.json')
const users = require('../../usuarios.json')
const trainer = require('../../trainer.json')

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
                id: el.id,
                name: el.name,
                description: el.description,
                video: el.video,
                image: el.image,
                price: el.price,
                day: el.day,
                hour: el.hour,
                capacity: el.capacity,
                trainers: el.trainers
            };
        });
        modelActivity.forEach(async (el) => {
            const activityIns = await Activity.findOrCreate({
                where: {
                    name: el.name,
                    description: el.description,
                    video: el.video,
                    image: el.image,
                    price: el.price,
                    day: el.day,
                    hour: el.hour,
                    capacity: el.capacity
                },
            });
            el.trainers.forEach(async (e) => {
                const trainersIns = await Trainer.findOne({
                    where: {
                        name: e.name
                    }
                })
                await trainersIns.addActivity(activityIns[0])
            })
        });
        console.log('Actividades cargadas en la DB')
    }
    catch (error) {
        console.log('Error en la carga de actividades a la DB')
    }
}

const loaderTrainer = async () => {
    try {
        const modelTrainer = trainer.map((el) => {
            return {
                id: el.id,
                name: el.name,
                image: el.image,
                specialty: el.specialty,
                experience: el.experience,
            };
        });
        modelTrainer.forEach(async (el) => {
            await Trainer.findOrCreate({
                where: {
                id: el.id,
                name: el.name,
                image: el.image,
                specialty: el.specialty,
                experience: el.experience,
                },
            });
        });
        console.log('Entrenadores cargados en la DB')
    }
    catch (error) {
        console.log('Error en la carga de entrenadores a la DB')
    }
}

module.exports = {
    loaderUsers,
    loaderActivity,
    loaderTrainer
}