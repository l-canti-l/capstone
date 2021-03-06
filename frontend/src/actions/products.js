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
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
} from "./types";
import axios from "axios";

export const listProducts = (searchTerm = '', pageNumber = '') => async (dispatch) => {
  try {
    //dispatch request
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products?searchTerm=${searchTerm}&pageNumber=${pageNumber}`);
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

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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
    const { data } = await axios.post(
      '/api/products',
      //not actually sending data so empty object
      {},
      configuration
    );

    //dispatch success
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    //get info for token from state
    const {
      userLogin: { userInfo },
    } = getState();
    //check if header has correct content type for token read
    const configuration = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make request
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      configuration
    );
    //dispatch success
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const createReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });
    //get info for token from state
    const {
      userLogin: { userInfo },
    } = getState();
    //check if header has correct content type for token read
    const configuration = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make request
    await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      configuration
    );

    //dispatch success
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    //dispatch request
    dispatch({
      type: TOP_PRODUCTS_REQUEST,
    });
    const { data } = await axios.get(`/api/products/top`);
    //dispatch success
    dispatch({
      type: TOP_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.data.message
          : error.message,
    });
  }
};