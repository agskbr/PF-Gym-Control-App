import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/actions-recipes/recipes";
import SearchBar from "../../components/SearchRecipes/SearchBar";
import Paginado from "./components/Paginado/Paginado";

export default function SocioPage() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(12)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



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

    <span>
{  
    currentRecipes?.map((el) => {
        return(
        <div key={el.id}>
        </div>
        )
    })
}
    </span>
</div>
);
}