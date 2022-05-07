import { ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART, TOTAL_CART} from "../actions-type/index.js";





export const initialState = {
    products: [],
    cart: [],
    totalCart: 0,
}


export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            let product = state.cart.find(product => product.id === action.payload.id);

           /*  console.log(action.payload) */
            /* console.log(product);  */     
            
            let itemInCart = state.cart?.find(item => item.id === action.payload.id);
            /* console.log(state.cart);
            console.log(itemInCart); */

            if (itemInCart) {
                itemInCart.quantity += 1;
                return {
                    ...state,
                    cart: [...state.cart],
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                }
            }
            
            /* return itemInCart ? {...state,
                                cart: state.cart.map(item =>
                                    item.id === product.id 
                                ? {...item, quantity: item.quantity + 1}
                                : item
                                )} : {
                                    ...state,
                                    cart: [...state.cart, {...action.payload, quantity: 1}]}; */

        case REMOVE_ONE_FROM_CART:
            let itemInCartToDel = state.cart.find(item => item.id === action.payload);

            return itemInCartToDel.quantity > 1 ? {...state,
                                cart: state.cart.map(item =>
                                item.id === action.payload
                                ? {...item, quantity: item.quantity - 1}
                                : item
                                )} : {
                                    ...state,
                                    cart: state.cart.filter(item => item.id !== action.payload)};

       /*  case ADD_TO_CART:{
            if (state.cart.length > 0) {
                let isProduct = state.cart.filter((e) => e.id === action.payload.id);
                
                if (isProduct.length > 0) {
                  let finalProduct = state.cart.map((e) => {
                    if (e.id === action.payload.id) {
                      e.count += 1;
                      return e;
                    } else {
                      return e;
                    }
                  });
                  return finalProduct;
                } else {
                  let cart = state.cart;
                  action.payload.quantity = 1;
                  cart.push(action.payload);
                  return cart;
                }
              } else {
                let cart = [];
                action.payload.quantity = 1;
                cart.push(action.payload);
                return cart;
              }

        } */

            
        
        case REMOVE_ALL_FROM_CART:
            return state.cart.filter(item => item.id !== action.payload);
        case CLEAR_CART:
                return {
                    cart : state.cart,
                }

        case TOTAL_CART:
            return {
                ...state,
                totalCart: action.payload
            }
              default:
                return state;
    }
}