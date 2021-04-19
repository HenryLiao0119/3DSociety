// redux import
import { createStore, applyMiddleware } from 'redux';

// middleware import
import thunk from 'redux-thunk';

// redux dev tool import
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer file
import rootReducer from './reducers/index';

// localstorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};

const userCurrentFromStorage = localStorage.getItem('userCurrent')
  ? JSON.parse(localStorage.getItem('userCurrent'))
  : null;

// initialstate
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  users: {
    userCurrent: userCurrentFromStorage,
  },
};

// initialzed middleware
const middleware = [thunk];

// create the store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
