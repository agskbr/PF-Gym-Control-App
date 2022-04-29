const axios = require ('axios');


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



module.exports = getApiInfo

