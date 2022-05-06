import { combineReducers } from "redux";
import { rootReducer } from "./rootReducer";
import { cartReducer } from "./cartReducer";
import { loginReducer } from "../reducer/login-reducer";

const reducer = combineReducers({
  pgym: rootReducer,
  cart: cartReducer,
  login: loginReducer,
});

export default reducer;
