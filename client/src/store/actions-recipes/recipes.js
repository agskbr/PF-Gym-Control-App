import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";
export const GET_DETAIL = "GET_DETAIL";

const base_url = "https://pfgymapp-2.herokuapp.com";
//const base_url = "http://localhost:3001";

export function getRecipes(){
    return async function (dispatch) {
        var json = await axios.get(`${base_url}/recipes`);
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function changePage(page) {
    return function(dispatch) {
        return dispatch({
            type: 'CHANGE_PAGE',
            payload: page
        })
    }
}

export function filterRecipes(filterBy) {
    console.log('action')
    console.log(filterBy)
    return function(dispatch) {
        return dispatch({
            type: 'FILTER_RECIPES',
            payload: filterBy
        })
    }
}



export function getNameRecipe (name){
    return async function (dispatch) {
        try{
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: name
            })
        }
        catch(error){
            console.log(error)
        }
    }
} 


export function getDetail(id){
    return async function (dispatch) {
        var json = await axios.get(`${base_url}/recipes` + id);
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        })
    }
}
