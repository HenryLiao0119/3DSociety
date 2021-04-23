import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  // ORDER_LIST_MY_REQUEST,
  // ORDER_LIST_MY_SUCCESS,
  // ORDER_LIST_MY_FAIL,
  // ORDER_LIST_MY_RESET,
  // ORDER_LIST_FAIL,
  // ORDER_LIST_SUCCESS,
  // ORDER_LIST_REQUEST,
  // ORDER_DELIVER_FAIL,
  // ORDER_DELIVER_SUCCESS,
  // ORDER_DELIVER_REQUEST,
  // ORDER_DELIVER_RESET,
  // ORDER_CREATE_RESET,
} from '../constants/orderTypes';

const initialState = {
  order: [],
  orderlist: [],
  error: null,
  successPaid: null,
  SuccessDelivered: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // create order
    case ORDER_CREATE_REQUEST:
      return { ...state };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // get order detail
    case ORDER_DETAILS_REQUEST:
      return { ...state };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // pay order
    case ORDER_PAY_REQUEST:
      return { ...state };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        successPaid: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case ORDER_PAY_RESET:
    //   return {};
    // get order list
    // deliver orders
    default:
      return state;
  }
};
