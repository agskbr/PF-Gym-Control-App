import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../../../store/actions-recipes/recipes";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Card from "./Card";

export default function SocioPage() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipe.recipes);
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(4)
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
<div>
    <Paginado
    recipesPerPage={recipesPerPage} 
    allRecipes={allRecipes.length} 
    paginado={paginado} />        
</div>

    <span>
{  
    currentRecipes?.map((el) => {
        return(
        <div key={el.id}>
               <Card 
               image={el.img? el.img : el.image} 
               name={el.name} 
               diets={el.diets} 
               key={el.id} 
               id={el.id}
                   
               />  

        </div>
        )
    })
}
    </span>
</div>
);
}