import  {
    ADD_DESCUENTO,
    GET_DESCUENTO,
    MOD_DESCUENTO,
    GET_ALL_DESCUENTOS
} from "../actions-type";


export const initialState = {
    descuentos: [],
}


export function descuentoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DESCUENTO:
            return {
                ...state,
                descuentos: [...state.descuentos, action.payload]
            };
        case GET_DESCUENTO:
            return {
                ...state,
                descuentos: [action.payload]
            };
        case MOD_DESCUENTO:
            return {
                ...state,
                descuentos: [action.payload]
            };
        case GET_ALL_DESCUENTOS:
            console.log ("action.payload", action.payload);
            return {
                ...state,
                descuentos: action.payload
            };
        default:
            return state;
    }
}