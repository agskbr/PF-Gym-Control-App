export const TYPES = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_ONE_FROM_CART: "REMOVE_ONE_FROM_CART",
    REMOVE_ALL_FROM_CART: "REMOVE_ALL_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
}



export function addToCart(payload) {
    return {
        type: TYPES.ADD_TO_CART,
        payload
    }
}
export function removeFromCart(payload) {
    return {
        type: TYPES.REMOVE_ONE_FROM_CART,
        payload
    }
}
export function clearCart() {
    return {
        type: TYPES.CLEAR_CART
    }
}
