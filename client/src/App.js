import React, { Fragment } from 'react';

// bootstrap
import { Container } from 'react-bootstrap';

// react router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

// components
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <main className='py-3'>
            <Container>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/order/:id?' component={OrderScreen} />
              {/* ADMIN ONLY ROUTES */}
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route path='/admin/productlist' component={ProductListScreen} />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />
              <Route path='/admin/orderlist' component={OrderListScreen} />

              {/* search and page paths */}
              <Route path='/search/:keyword' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
              />
            </Container>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
