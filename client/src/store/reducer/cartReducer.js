import { 
    ADD_TO_CART,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    TOTAL_CART,
    CLEAN_CART,
    ADD_ORDER_LINE,
    SET_DISCOUNT,
} from "../actions-type/index.js";





export const initialState = {
    order: [],
    cart: [],
    totalCart: 0,
    orderLine: [],
    capacity: [],
    newOrederLineId:[],
}


export function cartReducer(state = initialState, action) {
    switch (action.type) {
      case SET_DISCOUNT:
          state.order.forEach(product => { product.price = product.price * action.payload });
          state.cart.forEach(product => { product.price = product.price * action.payload });
          state.orderLine.forEach(product => { product.unitprice = product.unitprice * action.payload });
          state.orderLine.forEach(product => { product.subtotal = product.unitprice * product.quantity });
        return {
            ...state,
            order: [...state.order]
            /* order: [{
                ...state.order,
                price: action.payload,
            }] */
        }
        
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

        case "ORDER_LINE":
            return {
                ...state,
                newOrederLineId: action.payload
            }
        
        
        case ADD_TO_CART:
            //console.log(state.cart)
            let product = state.cart.find(product => product.id === action.payload.activity.id);

            //console.log(action.payload)
            //console.log(state.cart);
            //console.log(state.order);
            //console.log(state.orderLine);
            
            let itemInCart = state.cart?.find(item => item.dayHourId === action.payload.id );
      
            let itemInOrder = state.order?.find(item => item.name === action.payload.activity.name);
            let itemInOrderLine = state.orderLine?.find(item => item.diaHoraId === action.payload.id);
            console.log(itemInOrderLine)
            /* console.log(state.cart);
            console.log(itemInCart); */

            if (itemInCart) {
                itemInCart.quantity += 1;
                itemInOrder.count += 1;
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
                    cart: [...state.cart, { ...action.payload.activity, quantity: 1, day: action.payload.day, hour: action.payload.hour, dayHourId: action.payload.id}],
                    order: [...state.order, {
                        name: action.payload.activity.name,
                        price: action.payload.activity.price,
                        count: 1 
                      }],
                    orderLine: [...state.orderLine, {
                        activityId: action.payload.activity.id,
                        unitprice: action.payload.activity.price,
                        //orderId: Math.floor(Math.random(1,1000)),
                        quantity: 1,
                        subtotal: action.payload.activity.price,
                        diaHoraId: action.payload.id
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
            let itemInCartToDel = state.cart?.find(item => item.dayHourId === action.payload );
            let nameOfItem = itemInCartToDel.name;
            console.log(nameOfItem);


            return (
                      
              itemInCartToDel.quantity > 1 ? {...state,
                                cart: state.cart.map(item =>
                                item.dayHourId === action.payload
                                ? {...item, quantity: item.quantity - 1}
                                : item
                                ),
                                order: state.order.map(item =>
                                  item.name === nameOfItem
                                  ? {...item, count: item.count - 1}
                                  : item
                                  ),
                                orderLine: state.orderLine.map(item =>
                                    item.diaHoraId === action.payload
                                    ? {...item, quantity: item.quantity - 1, subtotal: item.unitprice * (item.quantity - 1)}
                                    : item
                                    ),
                              } : {
                                    ...state,
                                    cart: state.cart.filter(item => item.dayHourId !== action.payload),
                                    order: state.order.filter(item => item.name !== nameOfItem),
                                    orderLine: state.orderLine.filter(item => item.diaHoraId !== action.payload),
                                  }
                                  )
       
        
            
        
        /* case REMOVE_ALL_FROM_CART:
            return state.cart.filter(item => item.id !== action.payload);
 */

        
              default:
                return state;
    }
}