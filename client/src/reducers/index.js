import { combineReducers } from 'redux';
import productReducers from './productReducers';
import cartReducers from './cartReducers';
import userReducers from './userReducers';
import orderReducers from './orderReducers';

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
  users: userReducers,
  orders: orderReducers,
});
