import { combineReducers } from 'redux';
import { productListReducers } from './productReducers';

export default combineReducers({
  productList: productListReducers,
});
