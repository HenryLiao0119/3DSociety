import { combineReducers } from 'redux';
import productReducers from './productReducers';
import cartReducers from './cartReducers';
import userReducers from './userReducers';
import orderReducers from './orderReducers';

export default combineReducers({
  productStates: productReducers,
  cartStates: cartReducers,
  userStates: userReducers,
  orderStates: orderReducers,
});
