import { CART_ADD, CART_REMOVE } from "../actions/types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD:
      const item = action.payload;
      //check to see if item is already in cart
      //check if the item in the carts id = selected item
      const itemExists = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (itemExists) {
        return {
          ...state,
          //map thru current cart, for each product where current item id = itemExists id return the item for iteration
          cartItems: state.cartItems.map((x) =>
            x.productId === itemExists.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          //set state to array with current plus new item
          cartItems: [...state.cartItems, item],
        };
      }
      case CART_REMOVE:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.productId !== action.payload)
        }
    default:
        return state
  }
};
