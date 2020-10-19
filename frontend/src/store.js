import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productInfoReducer } from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productInfo: productInfoReducer,
    cart: cartReducer,
});

const cartItemsFromLocal = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState= {
    cart: { cartItems: cartItemsFromLocal }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;