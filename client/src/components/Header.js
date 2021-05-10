import React from 'react';
// import for routing
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// import for bootstrap
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import { logout } from '../actions/userActions';

//components
import SearchBar from '../components/SearchBar';

const Header = () => {
  const dispatch = useDispatch();

  // import states
  const userStates = useSelector((state) => state.userStates);
  const { userCurrent } = userStates;

  // logout function
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {/* page link */}
          <LinkContainer to='/'>
            <Navbar.Brand>3D Society</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* search bar */}
            <Route render={({ history }) => <SearchBar history={history} />} />

            {/* nav tabs */}
            {/* login/signout/sign in */}
            <Nav className='ml-auto'>
              {userCurrent ? (
                <NavDropdown title={userCurrent.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/*admin tab */}
              {userCurrent && userCurrent.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* cart tab */}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
