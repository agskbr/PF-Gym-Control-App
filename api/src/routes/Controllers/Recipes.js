const axios = require ('axios');
const {Recipe, Dietipe} = require ('../../db')

const getApiInfo = async () =>{
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=2440a3f8dfe748d39dd54bc652e3521e&addRecipeInformation=true&number=200`); 
        const apiInfo = await apiUrl.data.results.map(el => {
            return{
                id: el.id,
                name: el.title,
                summary: el.summary,
                image: el.image,
                diets: el.diets.map((diet) => diet),                
            }
        })
        return apiInfo;   
    } catch (error) {
        console.log(error)
    }
    console.log (apiUrl)
}

const getDbInfo = async () => {
    try {
        
        return await Recipe.findAll({
            include: {
                model: Dietipe,
                attributes : ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } catch (error) {
        console.log(error)
    }

}

const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

module.exports = {
    getAllRecipes
}