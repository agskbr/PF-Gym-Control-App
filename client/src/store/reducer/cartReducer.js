import { 
    ADD_TO_CART,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    TOTAL_CART,
    CLEAN_CART,
    ADD_ORDER_LINE} from "../actions-type/index.js";





export const initialState = {
    order: [],
    cart: [],
    totalCart: 0,
    orderLine:[],
}


export function cartReducer(state = initialState, action) {
    switch (action.type) {
        
      case ADD_ORDER_LINE:
        return {
            ...state,
            orderLine: action.payload,
        };

      case CLEAR_CART:
                         
            return {
                ...state,
                cart: [],
                order: [],
                orderLine: [],
            }

        case ADD_TO_CART:
            let product = state.cart.find(product => product.id === action.payload.id);

           /*  console.log(action.payload) */
            /* console.log(product);  */     
            
            let itemInCart = state.cart?.find(item => item.id === action.payload.id);
            let itemInOrder = state.order?.find(item => item.name === action.payload.name);
            let itemInOrderLine = state.orderLine?.find(item => item.activityId === action.payload.id);
            /* console.log(state.cart);
            console.log(itemInCart); */

            if (itemInCart) {
                itemInCart.quantity += 1;
                itemInOrder.quantity += 1;
                itemInOrderLine.quantity += 1;
                itemInOrderLine.subtotal = ((itemInOrderLine.unitprice * itemInOrderLine.quantity));
                return {
                    ...state,
                    cart: [...state.cart],
                    order: [...state.order],
                    orderLine: [...state.orderLine],
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                    order: [...state.order, {
                        name: action.payload.name,
                        price: action.payload.price,
                        quantity: 1 
                      }],
                    orderLine: [...state.orderLine, {
                        activityId: action.payload.id,
                        unitprice: action.payload.price,
                        orderId: Math.floor(Math.random(1,1000)),
                        quantity: 1,
                        subtotal: action.payload.price,
                        }]
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
            let idOfItem = state.cart.find(item => item.name === action.payload);


            return (
                      
              itemInCartToDel.quantity > 1 ? {...state,
                                cart: state.cart.map(item =>
                                item.name === action.payload
                                ? {...item, quantity: item.quantity - 1}
                                : item
                                ),
                                order: state.order.map(item =>
                                  item.name === action.payload
                                  ? {...item, quantity: item.quantity - 1}
                                  : item
                                  ),
                                orderLine: state.orderLine.map(item =>
                                    item.activityId === idOfItem.id
                                    ? {...item, quantity: item.quantity - 1, subtotal: item.unitprice * (item.quantity - 1)}
                                    : item
                                    ),
                              } : {
                                    ...state,
                                    cart: state.cart.filter(item => item.name !== action.payload),
                                    order: state.order.filter(item => item.name !== action.payload),
                                    orderLine: state.orderLine.filter(item => item.activityId !== action.payload),
                                  }
                                  )
       
        
            
        
        /* case REMOVE_ALL_FROM_CART:
            return state.cart.filter(item => item.id !== action.payload);
 */

        
              default:
                return state;
    }
}