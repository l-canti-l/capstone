import { USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_SUCCESS, USER_LOGIN_REQUEST_FAIL } from "./types";
import axios from 'axios';

//action that requests login token
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //check if header has correct content type for token read 
        const configuration = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //make request
        const { data } = await axios.post('/api/users/login', { email, password }, configuration)

        //dispatch success
        dispatch({
            type: USER_LOGIN_REQUEST_SUCCESS,
            payload: data
        })

        //set user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_REQUEST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}