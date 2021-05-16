import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_REQUEST,
} from '../constants/orderTypes';

const initialState = {
  order: {},
  orderList: [],
  orderError: null,
  orderCreated: false,
  orderPaid: false,
  orderDelivered: false,
  orderLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // reset states
    case ORDER_PAY_RESET:
      return {
        ...state,
        orderPaid: false,
      };
    case ORDER_CREATE_RESET:
      return {
        ...state,
        orderCreated: false,
      };
    case ORDER_DELIVER_RESET:
      return {
        ...state,
        orderDelivered: false,
      };
    // loading state
    case ORDER_REQUEST:
      return {
        ...state,
        orderLoading: true,
      };
    // create order
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderCreated: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // order details
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // pay order
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderPaid: true,
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // get order list
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderList: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // deliver orders
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderDelivered: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    // List Orders
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderList: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    default:
      return state;
  }
};
