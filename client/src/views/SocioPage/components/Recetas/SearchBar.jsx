import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameRecipe} from '../../../../store/actions-recipes/recipes';




export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState(" ")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipe(name))
        setName ({name:''})
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