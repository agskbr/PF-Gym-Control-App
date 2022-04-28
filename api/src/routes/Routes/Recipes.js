const {Router} = require ('express');
const router = Router();
const getApiInfo = require ('../Controllers/Recipes.js')

router.get ('/', async (req, res,) => {
    const name = req.query.name;
    const recipesTotal = await getApiInfo();
    if (name){
        let recipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); 
        recipeName.length // si hay algo en la lista, traemelo; sino, pongo el error 404 con el texto.
        ? res.status(200).send(recipeName) 
        : res.status(404).send('No se encontro la receta que buscas');
    }else{ // caso contrario que no haya un query, envia todas las recetas
        res.status(200).send(recipesTotal);
    }



})

router.get ('/:id', async (req, res,) => {
const id = req.params.id;
const allRecipes = await getApiInfo();
if(id){
    const fillRecipe = await allRecipes.filter(el => el.id.toString() === id);
    fillRecipe.length
    ? res.status(200).json(fillRecipe)
    : res.status(404).send("La receta no existe, intenta con otro ID.");
}
})


module.exports = router;