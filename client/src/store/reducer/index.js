import { combineReducers } from "redux";
import { rootReducer } from "./rootReducer";
import { cartReducer } from "./cartReducer";
import { reviewReducer } from "./reviewReducer";
import { loginReducer } from "./login-reducer";
import {recipeReducer} from "./recipes";
import { userReducer } from "./usersReducer";

const reducer = combineReducers({
  pgym: rootReducer,
  cart: cartReducer,
  review: reviewReducer,
  login: loginReducer,
  recipe: recipeReducer,
  users: userReducer,
});

export default reducer;
