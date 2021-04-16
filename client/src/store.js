// redux import
import { createStore, applyMiddleware } from 'redux';

// middleware import
import thunk from 'redux-thunk';

// redux dev tool import
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer file
import rootReducer from './reducers/index';

// initialstate
const initialState = {};

// initialzed middleware
const middleware = [thunk];

// create the store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
