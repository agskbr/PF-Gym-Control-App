const {Router} = require ('express');
const router = Router();
const getAllRecipes = require ('../routes/Controllers/Recipes')


router.get ('/', async (req, res, next) => {
    try {
        
        const name = req.query.name;
        const recipesTotal = await getAllRecipes();
        if (name){
            let recipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); 
        recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send('No se encontro la receta que buscas');
    }else{ 
        res.status(200).send(recipesTotal);
    }
} catch (error) {
    next(error);
}
})

router.get ('/:id', async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const allRecipes = await getAllRecipes();
        if(id){
            const fillRecipe = await allRecipes.filter(el => el.id.toString() === id);
            fillRecipe.length
            ? res.status(200).json(fillRecipe)
            : res.status(404).send("La receta no existe, intenta con otro ID.");
        }
    } catch (error) {
        next(error)
    }
    })
    

module.exports = router;