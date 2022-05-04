import { TYPES } from "../actions-cart"





export const cartInitialState = {
    products: [],
    cart: [],
}


export function cartReducer(state = cartInitialState, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART:
            return {
                ...state,
                products: state.products,
                cart: [...state.cart, action.payload]
            }
        case TYPES.REMOVE_ONE_FROM_CART:
            return {
                ...state,
                products: state.products,
                cart: state.cart.filter(product => product.id !== action.payload)
            }
        case TYPES.REMOVE_ALL_FROM_CART:
            return {
                ...state,
                products: state.products,
                cart: []
            }
        case TYPES.CLEAR_CART:
            return {
                ...state,
                products: state.products,
                cart: []
            }
        default:
            return state;
    }
}