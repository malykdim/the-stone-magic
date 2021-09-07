import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mosaicListReducer, mosaicDetailsReducer } from './reducers/mosaicReducers.js';
import { cartReducer } from './reducers/cartReducers.js';

const reducer = combineReducers({
    mosaicList: mosaicListReducer,
    mosaicDetails: mosaicDetailsReducer,
    cart: cartReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;