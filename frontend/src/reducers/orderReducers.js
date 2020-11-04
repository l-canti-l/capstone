import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAID_REQUEST, ORDER_PAID_SUCCESS, ORDER_PAID_FAIL, ORDER_PAID_RESET } from '../actions/types';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }        
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }        
        default:
            return state
    }
}

export const orderPaidReducer = (state = { }, action) => {
    switch (action.type) {
        case ORDER_PAID_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAID_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAID_RESET:
            return {
                
            }      
        default:
            return state
    }
}