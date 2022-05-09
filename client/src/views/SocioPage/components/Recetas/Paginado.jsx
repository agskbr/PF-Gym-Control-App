import React from 'react';
import style from './Paginado.module.css'

export default function Paginado({recipesPerPage, allRecipes, paginado}){

    const pageNumber = []
    for (let i=0; i < Math.ceil(allRecipes / recipesPerPage); i++){
        pageNumber.push(i+1)
    }
    return (
        <nav>
            <ul className= {style.paginado}>
                {
                    pageNumber?.map(number => (
                        <li key={number}>
                        <button className= {style.botonp} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))   
                }
            </ul>
        </nav>
    )
       

    
}