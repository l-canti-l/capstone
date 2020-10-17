import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
  PRODUCT_INFO_REQUEST,
  PRODUCT_INFO_REQUEST_SUCCESS,
  PRODUCT_INFO_REQUEST_FAILURE,
} from "../actions/types";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_REQUEST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productInfoReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_INFO_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_INFO_REQUEST_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_INFO_REQUEST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
