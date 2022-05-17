import { 
    GET_RECIPES,
    GET_NAME_RECIPES,
    

} from '../actions-recipes/recipes.js'

const initialState ={
    recipes: [],
    orderedRecipes: [],
    currentPage: []
 }
 
 function recipeReducer (state = initialState, action){
    switch(action.type){

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload.slice(0, 50),
                orderedRecipes: action.payload.slice(0, 50),
                currentPage: action.payload.slice(0,4)
            }

            
        case GET_NAME_RECIPES:
            return {
                ...state,
                orderedRecipes: state.recipes.filter(recipe => recipe.title.toLowerCase().includes(action.payload.toLowerCase())),
                currentPage: state.recipes.filter(recipe => recipe.title.toLowerCase().includes(action.payload.toLowerCase()))
            }

        case 'FILTER_RECIPES':
            if (action.payload === "defaultFilter") {
                return {
                  ...state,
                  orderedRecipes: state.recipes,
                  currentPage: state.recipes.slice(0,4)
                };
              }
            
            return {
                    ...state,
                    orderedRecipes: state.recipes.filter(recipe => recipe.diets.includes(action.payload)),
                    currentPage: state.recipes.filter(recipe => recipe.diets.includes(action.payload)).slice(0,4)
                }
            
        case "CHANGE_PAGE":
            console.log('reducer')
            console.log(action.payload)
            return {
                ...state,
                currentPage: state.orderedRecipes.slice((action.payload - 1) * 4,action.payload * 4)                        
            };

            default:
                return {
                  ...state,
                };
    }
}

export  {recipeReducer};