import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAID_FAIL, ORDER_PAID_SUCCESS, ORDER_PAID_REQUEST, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, CART_CLEAR_ITEMS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL } from './types';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });
      //get info for token from state
      const {
        userLogin: { userInfo },
      } = getState();
      //check if header has correct content type for token read
      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      //make request
      const { data } = await axios.post(
        `/api/orders`,
        order,
        configuration
      );
  
      //dispatch success
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      }); 
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
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
      const { data } = await axios.get(
        `/api/orders/${id}`,
        configuration
      );
  
      //dispatch success
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      }); 
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAID_REQUEST,
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
        `/api/orders/${orderId}/paid`,
        paymentResult,
        configuration
      );
  
      //dispatch success
      dispatch({
        type: ORDER_PAID_SUCCESS,
        payload: data,
      }); 
    } catch (error) {
      dispatch({
        type: ORDER_PAID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: MY_ORDER_LIST_REQUEST,
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
      const { data } = await axios.get(
        `/api/orders/myorders`,
        configuration
      );
  
      //dispatch success
      dispatch({
        type: MY_ORDER_LIST_SUCCESS,
        payload: data,
      }); 
    } catch (error) {
      dispatch({
        type: MY_ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const adminListOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
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
      const { data } = await axios.get(
        `/api/orders`,
        configuration
      );
  
      //dispatch success
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      }); 
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVERED_REQUEST,
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
      const { data } = await axios.put(
        `/api/orders/${order._id}/delivered`,
        {},
        configuration
      );
      //dispatch success
      dispatch({
        type: ORDER_DELIVERED_SUCCESS,
        payload: data,
      }); 
    } catch (error) {
      dispatch({
        type: ORDER_DELIVERED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };