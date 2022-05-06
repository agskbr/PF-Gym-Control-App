const activities = require('../../activity.json')
const users = require('../../usuarios.json')
const trainer = require('../../trainer.json')
const review = require('../../review.json')
const diaHora = require('../../diaHora.json')
const {
    Activity,
    User,
    Trainer,
    Review,
    DiaHora
} = require('../db');



const loaderUsers = async () => { 
    try {
        /* const modelUsers = users.map((el) => {
            return {
                name: el.name,
                lastName: el.lastName,
                email: el.email,
                phoneNumber: el.phoneNumber,
                image: el.image,
                isAdmin: el.isAdmin
            };
        }); */
        users.forEach(async (el) => {
            const userIns = await User.findOrCreate({
                where: {
                    name: el.name,
                    lastName: el.lastName,
                    email: el.email,
                    phoneNumber: el.phoneNumber,
                    image: el.image,
                    isAdmin: el.isAdmin
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
        /* const modelActivity = activities.map((el) => {
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                video: el.video,
                image: el.image,
                price: el.price,
                capacity: el.capacity,
                trainers: el.trainers
            };
        }); */
        activities.forEach(async (el) => {
            const activityIns = await Activity.findOrCreate({
                where: {
                    name: el.name,
                    description: el.description,
                    video: el.video,
                    image: el.image,
                    price: el.price,
                    capacity: el.capacity
                },
            });
            el.trainers.forEach(async (e) => {
                const trainersIns = await Trainer.findOne({
                    where: {
                        name: e
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
        /* const modelTrainer = trainer.map((el) => {
            return {
                id: el.id,
                name: el.name,
                image: el.image,
                specialty: el.specialty,
                experience: el.experience,
                activities: el.activities
            };
        }); */
        trainer.forEach(async (el) => {
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

const louderReview = async () =>{
    try {
        review.forEach(async (el) => {
            await Review.findOrCreate({
                where: {
                    rating: el.rating,
                    description: el.description,
                    userId: el.userId,
                    activityId: el.activityId
                },
            });
        })
        console.log('Review cargados en la DB')
    } catch (error) {
        console.log('Error en la carga de Review a la DB')
    }
}


const louderDiaHora = async () =>{
    try {
        diaHora.forEach(async (el) => {
            await DiaHora.findOrCreate({
                where: {
                    day: el.day,
                    hour: el.hour,
                    capacity: el.capacity,
                    activityId: el.activityId
                },
            });
        })
        console.log('diaHora cargados en la DB')
    } catch (error) {
        console.log('Error en la carga de diaHora a la DB')
    }
}

module.exports = {
    loaderUsers,
    loaderActivity,
    loaderTrainer,
    louderReview,
    louderDiaHora
}