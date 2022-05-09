import { 
    GET_RECIPES,
    GET_NAME_RECIPES,
    

} from '../actions-recipes/recipes.js'

const initialState ={
    recipes: [],
    
    
     
 }
 
 function recipeReducer (state = initialState, action){
    switch(action.type){

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            }

            
        case GET_NAME_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }    

        
            default:
                return {
                  ...state,
                };
    }
}

export  {recipeReducer};