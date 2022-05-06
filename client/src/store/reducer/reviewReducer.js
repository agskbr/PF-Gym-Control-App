import {
    CREATE_REVIEW, 
    GET_ALL_REVIEWS,
} from '../actions-type/index';


export const initialState = {
    reviews: []
};

export const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_REVIEW:
            return {
                ...state
            };
        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};


