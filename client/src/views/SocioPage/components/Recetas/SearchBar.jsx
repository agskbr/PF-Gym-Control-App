import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameRecipe} from '../../../../store/actions-recipes/recipes';
import {getRecipes} from '../../../../store/actions-recipes/recipes';




export default function SearchBar(){
    const dispatch = useDispatch()
    const [title,setTitle] = useState(" ")

    function handleInputChange(e){
        e.preventDefault()
        setTitle(e.target.value)

        if (e.target.value === ""){
            dispatch(getRecipes())
        
    }
}

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipe(title))
        setTitle ({title:''})
    }
    
    return(
        <div>
            <input 
                type="text"
                placeholder= "Recetas..."
                onChange={(e) => handleInputChange(e)}
            />
            <button type = "submit" onClick={(e) => handleSubmit(e)}>Buscar</button>

        </div>
    )
}