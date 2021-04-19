import { combineReducers } from 'redux';
import { productListReducers, productDetailReducers } from './productReducers';

export default combineReducers({
  productList: productListReducers,
  productDetails: productDetailReducers,
});
