const axios = require ('axios');
const apiInfo = require("../../../recipes.json")


const getApiInfo = async () =>{
    try {
        /* const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b071f87d01bc44558aa41359c1a92b61&addRecipeInformation=true&number=100`); 
        const apiInfo = await apiUrl.data.results.map(el => {
            return{
                id: el.id,
                name: el.title,
                summary: el.summary,
                image: el.image,
                diets: el.diets.map((diet) => diet),                
            }
        }) */
        return apiInfo;   
    } catch (error) {
        console.log(error)
    }
}



module.exports = getApiInfo

