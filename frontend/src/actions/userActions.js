import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_REQUEST_SUCCESS,
  USER_DETAILS_REQUEST_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "./types";
import axios from "axios";

//action that requests login token
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    //check if header has correct content type for token read
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //make request
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      configuration
    );

    //dispatch success
    dispatch({
      type: USER_LOGIN_REQUEST_SUCCESS,
      payload: data,
    });

    //set user to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    //check if header has correct content type for token read
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //make request
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      configuration
    );

    //dispatch success
    dispatch({
      type: USER_REGISTER_REQUEST_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_REQUEST_SUCCESS,
      payload: data,
    });

    //set user to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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
    const { data } = await axios.get(
      `/api/users/${id}`,
      configuration
    );

    //dispatch success
    dispatch({
      type: USER_DETAILS_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(
      `/api/users/profile`,
      user,
      configuration
    );

    //dispatch success
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_REQUEST_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
