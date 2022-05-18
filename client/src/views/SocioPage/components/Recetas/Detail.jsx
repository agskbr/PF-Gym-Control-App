import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetail} from "../../../../store/actions-recipes/recipes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Detail() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const recipe = useSelector ((state)=> state.detail)

    useEffect(() => {
      dispatch(getDetail(id));   
    },[dispatch, id]);

    console.log(recipe);
    return(
        <div>
        <div>
            <h1>Detalle</h1>
        </div>
    <div>
        <div >
        {
            <div >
                <h1>{recipe[0].title}</h1>
                <img src= {recipe[0].image} alt="foto receta" width="300px" height="300px"/>
                <p > Summary:<br/> {recipe[0].summary}</p>
                <p > Score: {recipe[0].spoonacularScore}</p>
                <p > Health Score:{recipe[0].healthScore}</p>
                <p > Step:<br/> {recipe[0].step}</p>

            </div>

        }
        <Link to = '/'>
            <button>Volver</button>
        </Link>

    </div>
    </div>
    </div>
    )
    
}

