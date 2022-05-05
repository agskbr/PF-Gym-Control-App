import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import reducer from "../store/reducer";
/* import { loginReducer } from "./reducer/login-reducer"; */

const storageConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["NOMBRE", "AGN"]
}
const persistedReducer = persistReducer(storageConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;

