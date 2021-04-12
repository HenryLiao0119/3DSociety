import React, { Fragments } from 'react';

// bootstrap
import { Container } from 'react-bootstrap';

// react router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// Screens
import HomeScreen from './screens/HomeScreen';

// components
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragments>
          <Header />
          <main className='py-3'>
            <Container>
              <Route path='/' component={HomeScreen} exact />
            </Container>
          </main>
          <Footer />
        </Fragments>
      </Router>
    </Provider>
  );
};

export default App;
