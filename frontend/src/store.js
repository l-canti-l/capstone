import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productInfoReducer } from './reducers/productReducers.js';


const reducer = combineReducers({
    productList: productListReducer,
    productInfo: productInfoReducer,
});

const initialState= {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;