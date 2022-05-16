import { combineReducers } from "redux";
import { rootReducer } from "./rootReducer";
import { cartReducer } from "./cartReducer";
import { reviewReducer } from "./reviewReducer";
import { loginReducer } from "./login-reducer";
import {recipeReducer} from "./recipes";
import { userReducer } from "./usersReducer";
import { descuentoReducer } from "./descuento-reducer";

const reducer = combineReducers({
  pgym: rootReducer,
  cart: cartReducer,
  review: reviewReducer,
  login: loginReducer,
  recipe: recipeReducer,
  users: userReducer,
  descuentos: descuentoReducer
});

export default reducer;
