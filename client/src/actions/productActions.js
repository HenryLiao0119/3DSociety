import axios from 'axios';
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productTypes';

// list products
export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  // request data
  try {
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    // send data
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get single product
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    // request data
    const { data } = await axios.get(`/api/products/${id}`);
    // send data
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    const { data } = await axios.post('/api/products', {}, config);
    // send data
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    // send data
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    await axios.delete(`/api/products/${id}`, config);
    // send data
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create reviews
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    // grab user token
    const {
      userStates: { userCurrent },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCurrent.token}`,
      },
    };
    // request data
    await axios.post(`/api/products/${productId}/reviews`, review, config);
    // send data
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

// grab top products
export const listTopProducts = () => async (dispatch) => {
  try {
    // request data
    const { data } = await axios.get(`/api/products/top`);
    // send data
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
