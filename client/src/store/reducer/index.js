import {combineReducers} from 'redux';
import { rootReducer } from './rootReducer';
import { cartReducer } from './cartReducer';
import { reviewReducer } from './reviewReducer';

const reducer = combineReducers({
    pgym: rootReducer,
    cart: cartReducer,
    review: reviewReducer,
});

export default reducer;
