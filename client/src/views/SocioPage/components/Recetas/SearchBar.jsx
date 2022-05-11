import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNameRecipe} from '../../../../store/actions-recipes/recipes';
import {getRecipes} from '../../../../store/actions-recipes/recipes';
import style from './searchBar.module.css'




export default function SearchBar(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState(" ")

    let recipes = useSelector(state => state.recipe.recipes)

    const [searchOptions, setSearchOptions] = useState([])


    function handleInputChange(e){
        e.preventDefault()
        setTitle(e.target.value)

        e.target.value !== '' && setSearchOptions(recipes.filter(recipe => recipe.title.toLowerCase().includes(title.toLowerCase())))

        if (e.target.value === ""){
            setSearchOptions([])
            dispatch(getRecipes())
        
    }
}

    function handleAutoCompleteClick(e) {
        const searchBar = document.getElementById('searchBar')
        searchBar.value = e.target.value

        e.target.value !== '' && setSearchOptions(recipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value.toLowerCase())))

        setTitle(e.target.value)
        setSearchOptions([])

        dispatch(getNameRecipe(e.target.value))
    }

    function handleSubmit(e){
        e.preventDefault()
        setSearchOptions([])
        dispatch(getNameRecipe(title))
        setTitle ({title:''})
    }

    let autoComplete = searchOptions.map(option => {
        
        return (
            searchOptions.length > 2 && <button value={option.title} key={option.title} onClick={handleAutoCompleteClick} className={style.autoComplete}>{option.title}</button>
        )
    })
  

    console.log(searchOptions)    
    return(
        <div className={style.searchContainer}>
            <input 
                className={style.searchBar}
                id='searchBar'
                type="text"
                placeholder= "Recetas..."
                onChange={(e) => handleInputChange(e)}
            />
            <button className={style.buttonSearch} type = "submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            <div className={style.autoCompleteContainer}>
                {autoComplete}
            </div>
        </div>
    )
}