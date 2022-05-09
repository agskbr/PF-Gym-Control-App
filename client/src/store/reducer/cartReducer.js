import { ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART, TOTAL_CART, CLEAN_CART} from "../actions-type/index.js";





export const initialState = {
    order: [],
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
            let itemInOrder = state.order?.find(item => item.name === action.payload.name);
            /* console.log(state.cart);
            console.log(itemInCart); */

            if (itemInCart) {
                itemInCart.quantity += 1;
                itemInOrder.count += 1;
                return {
                    ...state,
                    cart: [...state.cart],
                    order: [...state.order],
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                    order: [...state.order, {
                        name: action.payload.name,
                        price: action.payload.price,
                        count: 1 
                      }],
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
            let itemInCartToDel = state.cart.find(item => item.name === action.payload);
            console.log(itemInCartToDel);

            return (
                      
              itemInCartToDel.quantity > 1 ? {...state,
                                cart: state.cart.map(item =>
                                item.name === action.payload
                                ? {...item, quantity: item.quantity - 1}
                                : item
                                ),
                                order: state.order.map(item =>
                                  item.name === action.payload
                                  ? {...item, count: item.count - 1}
                                  : item
                                  ),
                              } : {
                                    ...state,
                                    cart: state.cart.filter(item => item.name !== action.payload),
                                    order: state.order.filter(item => item.name !== action.payload)
                                  }
                                  )
       
        case CLEAN_CART:
          console.log("Reducer cleanCart");
                  let cart = state.cart.filter(item => item.quantity !== 0);
                  let order = state.order.filter(item => item.count !== 0);
                  
            return {
                ...state,
                cart: [],
                order: [],
            }
            
        
        case REMOVE_ALL_FROM_CART:
            return state.cart.filter(item => item.id !== action.payload);


        case CLEAR_CART:

                console.log("entre al reducer clear cart");

                return {
                    ...state,
                    cart : state.cart.filter(item => item.id !== action.payload),
                }

              default:
                return state;
    }
}