const axios = require('axios');
const {Activity, User} = require("../../db");

const activitysDbInfo = async () => {
    try {
        return await Activity.findAll({include:{User}})
    } catch (err) {
        console.log(err);
    }
}

const getCards = async (req,res) => {
    // ME GUARDO EL NAME QUE ME LLEGA POR QUERY PARA USARLO CUANDO LO NECESITE
    const {name} = req.query;
    try {
        const allCards = await activitysDbInfo();
        if(name){
            const cardsName = allCards.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
            cardsName.length ? 
            res.status(200).send(cardsName) : 
            res.status(404).send('Esta card no existe');
        }else{
            res.status(200).send(allCards);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getCards
}