import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productTypes';

const initialState = {
  products: [],
  error: null,
};

// product list
export const productListReducers = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// product detail

// delete product

// create product

// update productc
