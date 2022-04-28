const {
    Activity,
    User
} = require('../../db');
const data = require('../../../package.json')

const activitysDbInfo = async () => {
    try {
        return await Activity.findAll({
            include: {
                model: User,
                attributes: ["name","lastName","dni"],
                include: {
                    model: Activity_User,
                    attributes: ["payDay", "payState"]
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}
// //PEDIR A GUSTA COMO TIENE LA INFO EN EL JSON //
// const getActivityInfo = async () => {
//     try{
//         Activity.create({
//             name: name,
//             description:description,
//             video: video,
//             image:image,
//             price:price,
//             day: day,
//             hour: hour,
//             capacity: capacity,


//         })
//         console.log("Activity created successfully")
//     }
//     catch (error) {
//         console.log("Error in creating the activity, try again")
// }


//agregar , getActivityInfo
module.exports = {
    activitysDbInfo
}


// hacer la getApiInfo