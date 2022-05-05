import {combineReducers} from 'redux';
import { rootReducer } from './rootReducer';
import { cartReducer } from './cartReducer';

const reducer = combineReducers({
    pgym: rootReducer,
    cart: cartReducer,
});

export default reducer;