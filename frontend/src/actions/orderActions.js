import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from './types';
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