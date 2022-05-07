import { ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART } from "../actions-type/index.js";





export const cartInitialState = {
    products: [],
    cart: [],
}


export function cartReducer(state = cartInitialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                products: state.products,
                cart: [...state.cart, action.payload]
            }
        case REMOVE_ONE_FROM_CART:
            return {
                ...state,
                products: state.products,
                cart: state.cart.filter(product => product.id !== action.payload)
            }
        case REMOVE_ALL_FROM_CART:
            return {
                ...state,
                products: state.products,
                cart: []
            }
        case CLEAR_CART:
            return {
                ...state,
                products: state.products,
                cart: []
            }
        default:
            return state;
    }
}