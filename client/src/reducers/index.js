import { combineReducers } from 'redux';
import productReducers from './productReducers';
import cartReducers from './cartReducers';
import userReducers from './userReducers';

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
  users: userReducers,
});
