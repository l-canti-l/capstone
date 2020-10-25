import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productInfoReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducer";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productInfoReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer
});

//get data from local
const cartItemsFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromLocal },
  userLogin: { userInfo: userInfoFromLocal }
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
