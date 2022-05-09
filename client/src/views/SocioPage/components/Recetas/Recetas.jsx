import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../../../store/actions-recipes/recipes";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Card from "./Card";
import style from './Recetas.module.css'
import Filter from "./filter";

export default function SocioPage() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.currentPage);

    useEffect(() => {
    dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
    }

    return (
        <div className={style.container}>
                    
                <div className={style.navbar}>
                    <SearchBar />
                    <Filter />
                </div>
            
            

                    <div className={style.recipeGrid}>
                                        {  
                                            recipes?.map((el) => {
                                                console.log(el)
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
                                                )})   },
                        </div>        
                
                        <Paginado />
        </div>
    );
}
