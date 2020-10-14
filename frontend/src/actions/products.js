import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
} from "./types";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    //dispatch request
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/products");
    //dispatch success
    dispatch({
      type: PRODUCT_LIST_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REQUEST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.data.message
          : error.message,
    });
  }
};
