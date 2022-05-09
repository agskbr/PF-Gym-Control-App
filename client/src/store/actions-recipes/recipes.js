import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";

export function getRecipes(){
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}


export function getNameRecipe (payload){
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/recipes?name=" + payload);
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
} 

