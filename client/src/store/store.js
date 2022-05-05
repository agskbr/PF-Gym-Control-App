import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer/index";
import { loginReducer } from "./reducer/login-reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export { store };
