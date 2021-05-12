import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_REQUEST,
} from '../constants/productTypes';

const initialState = {
  product: { reviews: [] },
  productList: [],
  productTop: [],
  pages: null,
  page: null,
  productError: null,
  productLoading: true,
  productCreated: false,
  productDeleted: false,
  productUpdated: false,
  productReviewed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // loading state reset
    case PRODUCT_REQUEST:
      return {
        ...state,
        productLoading: true,
      };
    // product list
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productLoading: false,
        productList: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        productLoading: false,
        productError: action.payload,
      };
    // product detail
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
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
        ...state,
        productError: action.payload,
        productLoading: false,
      };
    case PRODUCT_DELETE_RESET:
      return {
        ...state,
        productDeleted: false,
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
    case PRODUCT_CREATE_RESET:
      return {
        ...state,
        productCreated: false,
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
    case PRODUCT_UPDATE_RESET:
      return {
        ...state,
        productUpdated: false,
      };
    // review product
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        productReviewed: true,
        productLoading: false,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        productError: action.payload,
        productLoading: false,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {
        ...state,
        productReviewed: false,
      };
    // top product
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        productTop: action.payload,
        productLoading: false,
      };
    case PRODUCT_TOP_FAIL:
      return {
        ...state,
        productError: action.payload,
        productLoading: false,
      };
    default:
      return state;
  }
};
