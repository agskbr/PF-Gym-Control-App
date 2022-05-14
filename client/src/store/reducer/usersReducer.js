import {
    GET_USER_BY_EMAIL,
    CREATE_USER,
    GET_USERS,
    GET_USER_BY_UID,
    EDIT_USER
} from '../actions-type/index.js'

export const initialState = {
    users : []
};

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case GET_USER_BY_EMAIL:
            return {
                ...state,
                users: action.payload,
            }    
        case GET_USER_BY_UID:
            return {
                ...state,
                users: action.payload
            }
        case CREATE_USER:
            return {
                ...state
            }   
        case EDIT_USER:
            return {
                ...state,
            } 
        default:
            return {
                ...state,
            }    
    }
}