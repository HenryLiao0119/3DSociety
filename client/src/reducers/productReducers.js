import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productTypes';

const initialState = {
  product: [],
  productList: [],
  productError: null,
  productLoading: true,
  productDeleted: false,
  productUpdated: false,
  productCreated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productLoading: false,
        productList: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        productLoading: false,
        productError: action.payload,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        productLoading: false,
        productError: action.payload,
      };
    // delete product
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        productDeleted: true,
        productLoading: false,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        productError: action.payload,
        productLoading: false,
      };
    // create product
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        product: action.payload,
        productCreated: true,
        productLoading: false,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        productError: action.payload,
        productLoading: false,
      };
    // update productc
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        productUpdated: true,
        productLoading: false,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        productError: action.payload,
        productLoading: false,
      };
    default:
      return state;
  }
};
