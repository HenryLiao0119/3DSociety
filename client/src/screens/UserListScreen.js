import React, { Fragment, useEffect } from 'react';

// bootstrap import
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';

// redux impport
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

// ations import
import { listUsers, deleteUsers } from '../actions/userActions';

// constant import
import { USER_DELETE_RESET } from '../constants/userTypes';

const UserListScreen = ({ history }) => {
  // redux
  const dispatch = useDispatch();

  const userStates = useSelector((state) => state.userStates);
  const { userLoading, userError, userList, userCurrent, userDeleted } =
    userStates;

  useEffect(() => {
    if (userDeleted) {
      dispatch({ type: USER_DELETE_RESET });
    }
    if (userCurrent && userCurrent.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push(`/login`);
    }
  }, [dispatch, history, userCurrent, userDeleted]);

  const deleteHandler = (id) => {
    if (window.confirm('Please Confirm You Are Deleting An User')) {
      dispatch(deleteUsers(id));
    }
  };

  return (
    <Fragment>
      <Meta title='List Of Users' />
      <h1>Users</h1>
      {userLoading ? (
        <Loader />
      ) : userError ? (
        <Message variant='danger'>{userError}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;
