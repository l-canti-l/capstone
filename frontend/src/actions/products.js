import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAILURE,
  PRODUCT_INFO_REQUEST,
  PRODUCT_INFO_REQUEST_SUCCESS,
  PRODUCT_INFO_REQUEST_FAILURE,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
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

export const listProductInfo = (id) => async (dispatch) => {
  try {
    //dispatch request
    dispatch({
      type: PRODUCT_INFO_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    //dispatch success
    dispatch({
      type: PRODUCT_INFO_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_INFO_REQUEST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    //get info for token from state
    const {
      userLogin: { userInfo },
    } = getState();
    //check if header has correct content type for token read
    const configuration = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make request
    await axios.delete(
      `/api/products/${id}`,
      configuration
    );

    //dispatch success
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};