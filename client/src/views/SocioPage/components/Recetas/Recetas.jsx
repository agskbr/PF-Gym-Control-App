import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/actions-recipes/recipes";
import SearchBar from "../../components/SearchRecipes/SearchBar";

export default function SocioPage() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);



useEffect(() => {
    dispatch(getRecipes());
}, [dispatch]);

function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
}

    return (
        <div>
        <div>
        <h1> Recetario!!!</h1>
        </div>
        <div>
        <SearchBar />
        <button onClick={e=> {handleClick(e)}}>Volver a cargar</button>
        </div>

    <Paginado
    recipesPerPage={recipesPerPage} 
    allRecipes={allRecipes.length} 
    paginado={paginado} />        

        </div>
);
}