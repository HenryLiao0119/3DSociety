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
            </Container>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
