import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// paypal import
import { PayPalButton } from 'react-paypal-button-v2';

// bootstrap import
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// router import
import { Link } from 'react-router-dom';

// component import
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

// actions import
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';

// constants import
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderTypes';

const OrderScreen = ({ match, history }) => {
  // pull id
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  // redux
  const dispatch = useDispatch();

  const orderStates = useSelector((state) => state.orderStates);
  const { order, orderLoading, orderError, orderPaid, orderDelivered } =
    orderStates;

  const userStates = useSelector((state) => state.userStates);
  const { userCurrent } = userStates;

  useEffect(() => {
    if (!userCurrent) {
      history.push('/login');
    }

    // paypal api
    const addPayPalScipt = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      orderPaid ||
      orderDelivered ||
      order._id !== orderId ||
      orderLoading
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!orderPaid) {
      if (!window.paypal) {
        addPayPalScipt();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    order,
    orderId,
    userCurrent,
    orderPaid,
    orderDelivered,
    history,
    orderLoading,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return orderLoading ? (
    <Loader />
  ) : orderError ? (
    <Message variant='danger'>{orderError}</Message>
  ) : (
    <Fragment>
      <Meta title='Order Detail' />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address} {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    $
                    {order.itemsPrice
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    $
                    {order.shippingPrice
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>
                    $
                    {order.taxPrice
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    $
                    {order.totalPrice
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {orderLoading && <Loader />}
              {userCurrent &&
                userCurrent.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderScreen;
