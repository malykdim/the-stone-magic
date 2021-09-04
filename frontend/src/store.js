import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mosaicListReducer, mosaicDetailsReducer } from './reducers/mosaicReducers.js';

const reducer = combineReducers({
    mosaicList: mosaicListReducer,
    mosaicDetails: mosaicDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;