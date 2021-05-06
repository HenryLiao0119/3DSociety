import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartTypes';

// add to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // grab data
  const { data } = await axios.get(`/api/products/${id}`);

  const price = data.priceProduct;

  // send data
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: price,
      productionAmount: data.productionAmount,
      qty,
    },
  });

  // save in localStorage
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartStates.cartItems)
  );
};

// remove cart item
export const removeFromCart = (id) => async (dispatch, getState) => {
  // send data
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // update localstorage
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartStates.cartItems)
  );
};

// save shipping address
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// save payment
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
