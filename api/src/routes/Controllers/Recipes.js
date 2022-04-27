const axios = require ('axios');
const API_KEY = "2440a3f8dfe748d39dd54bc652e3521e"
const API_KEY1 = "b071f87d01bc44558aa41359c1a92b61"

module.exports = async function getApiInfo(){
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); 
        const apiInfo = await apiUrl.data.results.map(el => {
            return{
                id: el.id,
                name: el.title,
                summary: el.summary,
                spoonacularScore: el.spoonacularScore,
                healthScore: el.healthScore,
                // step: el.analyzedInstructions.map(obj => obj.steps.map(obj2 => obj2.step)),
                step: (el.analyzedInstructions.length>0 && Array.isArray(el.analyzedInstructions[0].steps))?el.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`).join(", ") :'No steps found',
                image: el.image,
                diets: el.diets.map((diet) => diet),                
            }
        })
        return apiInfo;   
        
    } catch (error) {
        console.log(error)
    }
}